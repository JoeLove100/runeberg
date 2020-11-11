from django.db import models


class Assets(models.Model):
    assetid = models.AutoField(db_column='AssetId', primary_key=True)
    assetname = models.CharField(db_column='AssetName', max_length=255)
    assetdisplayname = models.CharField(db_column='AssetDisplayName', max_length=255)

    class Meta:
        managed = False
        db_table = 'assets'


class HistoricData(models.Model):
    dataid = models.AutoField(db_column='DataId', primary_key=True)
    asofdate = models.DateField(db_column='AsOfDate')
    assetid = models.ForeignKey(Assets, models.CASCADE, db_column='AssetId')
    datatype = models.CharField(db_column='DataType', max_length=255)
    datavalue = models.DecimalField(db_column='DataValue', max_digits=18, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'historic_data'


class Indices(models.Model):
    indexid = models.AutoField(db_column='IndexId', primary_key=True)
    indexname = models.CharField(db_column='IndexName', max_length=255)
    indexdisplayname = models.CharField(db_column='IndexDisplayName', max_length=255)
    isincluded = models.BooleanField(db_column='IsIncluded')

    class Meta:
        managed = False
        db_table = 'indices'


class IndexHistoricPrices(models.Model):
    dataid = models.AutoField(db_column='DataId', primary_key=True) 
    asofdate = models.DateField(db_column='AsOfDate', blank=True, null=True)  
    indexid = models.ForeignKey('Indices', models.DO_NOTHING, db_column='IndexId', blank=True, null=True)  
    datatype = models.CharField(db_column='DataType', max_length=20, blank=True, null=True)  
    datavalue = models.DecimalField(db_column='DataValue', max_digits=10, decimal_places=2, blank=True, null=True)  

    class Meta:
        managed = False
        db_table = 'index_historic_prices'
