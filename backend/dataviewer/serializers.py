from rest_framework.serializers import ModelSerializer
from dataviewer.models import Assets, Indices, HistoricData, IndexHistoricPrices


class AssetSerializer(ModelSerializer):
    class Meta:
        model = Assets
        fields = "__all__"


class IndexSerializer(ModelSerializer):
    class Meta:
        model = Indices
        fields = "__all__"


class HistoricDataSerializer(ModelSerializer):
    class Meta:
        model = HistoricData
        fields = "__all__"

class IndexHistoricPricesSerializer(ModelSerializer):
    class Meta:
        model = IndexHistoricPrices
        fields = ["asofdate", "indexid", "datavalue"]      
