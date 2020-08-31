from rest_framework.viewsets import ModelViewSet
from dataviewer.serializers import IndexSerializer, AssetSerializer
from dataviewer.models import Indices, Assets


class AssetViewSet(ModelViewSet):
    serializer_class = AssetSerializer
    queryset = Assets.objects.all()


class IndexViewSet(ModelViewSet):
    serializer_class = IndexSerializer
    queryset = Indices.objects.all()
