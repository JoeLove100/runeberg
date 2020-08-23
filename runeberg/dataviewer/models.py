from django.db import models


class Asset(models.Model):
    assetid = models.AutoField(db_column='AssetId', primary_key=True)
    assetname = models.CharField(db_column='AssetName', max_length=255)
    assetdisplayname = models.CharField(db_column='AssetDisplayName', max_length=255)

    class Meta:
        managed = False
        db_table = 'assets'


class Index(models.Model):
    indexid = models.AutoField(db_column='IndexId', primary_key=True)
    indexname = models.CharField(db_column='IndexName', max_length=255)
    indexdisplayname = models.CharField(db_column='IndexDisplayName', max_length=255)
    isincluded = models.BooleanField(db_column='IsIncluded')

    class Meta:
        managed = False
        db_table = 'indices'


class HistoricData(models.Model):
    dataid = models.AutoField(db_column='DataId', primary_key=True)
    asofdate = models.DateField(db_column='AsOfDate')
    assetid = models.ForeignKey(Asset, db_column='AssetId', on_delete=models.CASCADE)
    datatype = models.CharField(db_column='DataType', max_length=255)
    datavalue = models.DecimalField(db_column='DataValue', max_digits=18, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'historic_data'


class IndexAssetMap(models.Model):
    indexid = models.ForeignKey(Index, db_column='IndexId', primary_key=True,
                                on_delete=models.CASCADE)
    assetid = models.ForeignKey(Asset, db_column='AssetId', on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'index_assets'
        unique_together = (('indexid', 'assetid'),)
