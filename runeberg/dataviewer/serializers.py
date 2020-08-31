from rest_framework.serializers import ModelSerializer
from dataviewer.models import Assets, Indices


class AssetSerializer(ModelSerializer):
    class Meta:
        model = Assets
        fields = "__all__"


class IndexSerializer(ModelSerializer):
    class Meta:
        model = Indices
        fields = "__all__"
