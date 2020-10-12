from django.shortcuts import render, redirect
from django.http import HttpResponse
from Naked.toolshed.shell import execute_js
import asyncio
import json

Hosts  = {}
launched = False

def Snake(request):
	return render(request, 'scripts/Snake/index.html')

def DTTS(request):
	return render(request, 'scripts/DTTS/index.html')

def Dammes(request):
	return render(request, 'scripts/Dammes/index.html')

def GOL(request):
	return render(request, 'scripts/GOL/index.html')

def Agar(request):
	if request.method == 'POST':
		HostId = request.POST["HostId"]
		request.session['HostId'] = HostId
		if HostId not in Hosts:
			Hosts[str(HostId)] = HostId
		return PlayAgar(request)
	return render(request, 'scripts/Agar/home.html')


def PlayAgar(request):
	# if not launched:
	# 	launchServer()
	print("hello")
	print(request.session)
	if 'HostId' in request.session:
		HostId = request.session['HostId']
		del request.session['HostId']
	else :
		return redirect('agar-home')
	print(HostId)
	return render(request, 'scripts/Agar/index.html', { 'HostId': HostId })

def launchServer():
	f = open('static/infos.json')
	rawData = f.read()
	f.close()
	data = json.loads(rawData)
	ip = data["ip"].split(':')
	command = "node static/Agar/server.js " + ip[0]+ " "+ ip[1]
	execute_js(command)
	launched = True





def MarchingSquares(request):
	return render(request, 'scripts/MarchingSquares/index.html')


def MarchingSquaresVsAI(request):
	return render(request, 'scripts/MarchingSquaresVsAI/index.html')


def Demineur(request):
	return render(request, 'scripts/Demineur/index.html')

def Clock(request):
	return render(request, 'scripts/Clock/index.html')

def GeneticAlgorithm(request):
	return render(request, 'scripts/GeneticAlgorithm/index.html')

def P53DTests(request):
	return render(request, 'scripts/P5_3D_Tests/index.html')

def Celestial(request):
	return render(request, 'scripts/PhysicEngines/Celestial/index.html')

def Newtonian(request):
	return render(request, 'scripts/PhysicEngines/Newtonian/index.html')

def Multiplications(request):
	return render(request, 'scripts/Multiplications/index.html')

def HeartBubble(request):
	return render(request, 'scripts/HeartBubble/index.html')

def ColoredTree(request):
	return render(request, 'scripts/ColoredTree/index.html')
