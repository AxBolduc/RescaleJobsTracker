import os
from django.urls import path
from .views import JobsView, JobView

from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path("", JobsView.as_view(), name="jobs"),
    path("/<uuid:job_id>", JobView.as_view(), name="job"),
]

urlpatterns = (
    format_suffix_patterns(urlpatterns) if os.getenv("DEBUG", False) else urlpatterns
)
