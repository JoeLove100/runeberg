from typing import Optional
from django.db.models import Model


class BuiltinsRouter:
    """
    Router to handle the built in django apps
    """
    route_app_labels = {"admin", "sessions", "messages", "staticfiles", "auth", "contenttypes"}

    def db_for_read(self,
                    model: Model,
                    **hints) -> Optional[str]:
        if model._meta.app_label in self.route_app_labels:
            return "default"
        else:
            return None

    def db_for_write(self,
                     model: Model,
                     **hints) -> Optional[str]:
        if model._meta.app_label in self.route_app_labels:
            return "default"
        else:
            return None

    def allow_relation(self,
                       model_1: Model,
                       model_2: Model,
                       **hints) -> Optional[bool]:
        if (model_1._meta.app_label in self.route_app_labels or
                model_2._meta.app_label in self.route_app_labels):
            return True
        else:
            return None

    def allow_migrate(self,
                      db: str,
                      app_label: str,
                      model_name: Optional[str] = None,
                      **hints) -> Optional[bool]:
        if app_label in self.route_app_labels:
            return db == "default"
        else:
            return None


class RemoteRouter:
    """
    Router to access remote SQL server database
    """


    remote_db = "remote"

    def db_for_read(self,
                    model: Model,
                    **hints) -> Optional[str]:
        return self.remote_db

    def db_for_write(self,
                     model: Model,
                     **hints) -> Optional[str]:
        return self.remote_db

    def allow_relation(self,
                       model_1: Model,
                       model_2: Model,
                       **hints) -> Optional[bool]:
        if (model_1._state.db == self.remote_db or
                model_2._state.db == self.remote_db):
            return True
        else:
            return None

    def allow_migrate(self,
                      db: str,
                      app_label: str,
                      model_name: Optional[str] = None,
                      **hints) -> Optional[bool]:
        return True
