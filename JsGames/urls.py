from django.conf.urls import url
from . import views

urlpatterns = [
	url('snake/', views.Snake, name='Snake'),
	url('dammes/', views.Dammes, name='Dammes'),
	url('dtts/', views.DTTS, name='Dtts'),
	url('gol/', views.GOL, name='Gol'),
	url('agar/', views.Agar, name='agar-home'),
	url('playagar/', views.PlayAgar, name='agar-play'),
	url('marchingsquares/', views.MarchingSquares, name='marchingsquares'),
	url('marchingsquaresvsai/', views.MarchingSquaresVsAI, name='marchingsquaresvsai'),
	url('demineur/', views.Demineur, name='demineur'),
	url('clock/', views.Clock, name='clock'),
	url('geneticalgorithm/', views.GeneticAlgorithm, name='geneticalgorithm'),
	url('p53dtests/', views.P53DTests, name='p53dTests'),
	url('multiplications/', views.Multiplications, name='multiplications'),
	url('heartbubble/', views.HeartBubble, name='heartbubble'),
	url('coloredtree/', views.ColoredTree, name='coloredtree'),
	url('physicengines/newtonian/', views.Newtonian, name='physic-newtonian'),
	url('physicengines/celestial/', views.Celestial, name='physic-celestial'),
]
