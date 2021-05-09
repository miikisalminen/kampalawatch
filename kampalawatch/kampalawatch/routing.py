from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import main.routing

django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter(
    {
        "websocket": AuthMiddlewareStack(URLRouter(main.routing.websocket_urlpatterns)),
        "http": django_asgi_app,
    }
)
