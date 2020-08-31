from rest_framework.routers import SimpleRouter
from dataviewer.views import AssetViewSet, IndexViewSet

router = SimpleRouter()
router.register("assets", AssetViewSet)
router.register("indices", IndexViewSet)
urlpatterns = router.urls
