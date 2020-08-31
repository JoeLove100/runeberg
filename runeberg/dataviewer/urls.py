from django.urls import path
from rest_framework.routers import SimpleRouter
from dataviewer.views import AssetViewSet, IndexViewSet, HistoricDataView

# Set up asset/indices using router
router = SimpleRouter()
router.register("assets", AssetViewSet)
router.register("indices", IndexViewSet)

# Do historic data separately as a bit more complex
urlpatterns = router.urls
urlpatterns += [
    path(r'data/<int:asset_id>/', HistoricDataView.as_view())
]
