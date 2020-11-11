from django_filters import rest_framework as filters
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView
from dataviewer.serializers import IndexSerializer, AssetSerializer, HistoricDataSerializer, IndexHistoricPricesSerializer
from dataviewer.models import Indices, Assets, HistoricData, IndexHistoricPrices
from django.views.generic.base import TemplateView


class AssetViewSet(ModelViewSet):
    serializer_class = AssetSerializer
    queryset = Assets.objects.all()


class IndexViewSet(ModelViewSet):
    serializer_class = IndexSerializer
    queryset = Indices.objects.all()


class HistoricDataFilter(filters.FilterSet):
    start_date = filters.DateFilter(field_name="asofdate", lookup_expr="gte")
    end_date = filters.DateFilter(field_name="asofdate", lookup_expr="lte")
    data_type = filters.CharFilter(field_name="datatype")

    class Meta:
        model = HistoricData
        fields = "__all__"


class HistoricDataView(ListAPIView):
    serializer_class = HistoricDataSerializer
    queryset = HistoricData.objects.all()
    filterset_class = HistoricDataFilter

    def get_queryset(self):

        asset_id = self.kwargs['asset_id']
        return HistoricData.objects.filter(assetid=asset_id)


class HistoricIndexDataFilter(filters.FilterSet):
    start_date = filters.DateFilter(field_name="asofdate", lookup_expr="gte")
    end_date = filters.DateFilter(field_name="asofdate", lookup_expr="lte")

    class Meta:
        model = IndexHistoricPrices
        fields = "__all__"


class HistoricIndexDataView(ListAPIView):
    serializer_class = IndexHistoricPricesSerializer
    queryset = IndexHistoricPrices.objects.all()
    filterset_class = HistoricIndexDataFilter

    def get_queryset(self):

        index_id = self.kwargs["index_id"]
        return IndexHistoricPrices.objects.filter(indexid=index_id)
