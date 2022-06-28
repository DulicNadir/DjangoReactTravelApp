from email.mime import base
from django.urls import path,include

from .views import AgencijaViewSet, UserTripList, UserViewSet, PutovanjeViewSet,KorisnikPutovanjeViewSet
from rest_framework.routers import DefaultRouter

router=DefaultRouter()
router.register('users',UserViewSet)
router.register('agencija',AgencijaViewSet)
router.register('putovanja',PutovanjeViewSet)
router.register('userputovanja',KorisnikPutovanjeViewSet)


urlpatterns=[
    path('',include(router.urls)),
    path('putkorisnik/<int:user_id>',UserTripList.as_view(),name='putkorisnik')
    #path('artikli/',article_list),
    #path('artikli/<int:pk>/',article_details)
    # path('articles/',ArticleList.as_view()),
    # path('articles/<int:id>/',ArticleDetails.as_view())
]