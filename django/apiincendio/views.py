from .models import Report
from .serializers import ReportSerializer
from .requests import requisicao
from rest_framework.response import Response
from django.utils import timezone


from rest_framework import viewsets, permissions, status


class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        parametro = request.query_params.get('latitude')
        parametro2 = request.query_params.get('longitude')
        today = timezone.now()
      
        queryset = Report.objects.all().filter(date__date=today.date())
       
      
        serializer = ReportSerializer(queryset, many=True)
        data = serializer.data

        if not parametro and not parametro2:
            return Response({"error": "Ocorreu um erro ao pegar a latitude e longitude do local."}, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            'data': data,
            'data_nasa': requisicao(parametro,parametro2)
        })
    
