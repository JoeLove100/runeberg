from django.urls import path, include
from rest_framework.routers import SimpleRouter
from dataviewer.views import AssetViewSet, IndexViewSet, HistoricDataView, DataChartView

# Set up asset/indices using router
router = SimpleRouter()
router.register(r'assets', AssetViewSet)
router.register(r'indices', IndexViewSet)

# Do historic data separately as a bit more complex
urlpatterns = [
   path(r'api/', include(router.urls)),
   path(r'api/data/<int:asset_id>/', HistoricDataView.as_view()),
   path(r'', DataChartView.as_view())
]
