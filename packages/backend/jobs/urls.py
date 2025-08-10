from django.urls import path
from .views import JobsView, JobView


urlpatterns = [
    path("", JobsView.as_view(), name="jobs"),
    path("/<uuid:job_id>", JobView.as_view(), name="job"),
]
