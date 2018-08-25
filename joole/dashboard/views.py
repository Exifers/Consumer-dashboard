from django.shortcuts import render, redirect
from django.views.generic import View

from .forms import ClientForm
from .models import Conso_eur, Conso_watt


class ClientFormView(View):
    def get(self, request):
        return render(request, 'dashboard/accueil.html')

    def post(self, request):
        form = ClientForm(request.POST)

        if form.is_valid():
            client_id = form.cleaned_data['client']
            return redirect('dashboard:results', client_id=client_id)

def results(request, client_id):
    conso_euro = []
    conso_watt = []
    annual_costs = [None, None]
    is_elec_heating = None
    dysfunction_detected = None

    ###################################
    elec_heating_ratio_threshold = 0.15
    dysfunction_ratio_threshold = 0.15

    def consoToList(conso):
      if (conso == None):
        return None
      return list(map(lambda x : round(x, 2),\
              [conso.janvier,
              conso.fevrier,
              conso.mars,
              conso.avril,
              conso.mai,
              conso.juin,
              conso.juillet,
              conso.aout,
              conso.septembre,
              conso.octobre,
              conso.novembre,
              conso.decembre]))


    conso_euro = consoToList(next(iter(Conso_eur.objects.all()
          .filter(client_id=client_id)
          .filter(year=2017)), None))

    conso_watt = consoToList(next(iter(Conso_watt.objects.all()
          .filter(client_id=client_id)
          .filter(year=2017)), None))

    if (conso_euro != None and conso_watt != None):

      annual_conso_euro = sum(conso_euro)

      annual_conso_watt = sum(conso_watt)

      annual_costs = [
        round(annual_conso_euro, 2),
        round(sum(consoToList(next(iter(\
          Conso_eur.objects.all()
            .filter(client_id=client_id)
            .filter(year=2016)),\
          None))), 2)
      ]

      # analysis
      average_watt = float(annual_conso_watt) / float(len(conso_watt))
      winter_max_watt = max(conso_watt[10], conso_watt[11], conso_watt[0])
      winter_ratio = float(winter_max_watt - average_watt) / float(average_watt)
      is_elec_heating = winter_ratio > elec_heating_ratio_threshold

      year_ratio = float(abs(annual_costs[0] - annual_costs[1])) /\
                   float(annual_costs[1])
      print(year_ratio)
      dysfunction_detected = year_ratio > dysfunction_ratio_threshold

    ###################################

    context = {
        "conso_euro": conso_euro,
        "conso_watt": conso_watt,
        "annual_costs": annual_costs,
        "is_elec_heating": is_elec_heating,
        "dysfunction_detected": dysfunction_detected
    }
    return render(request, 'dashboard/results.html', context)
