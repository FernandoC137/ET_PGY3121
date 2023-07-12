from rest_framework import serializers
from .models import Producto, ElementoCarrito, Carrito, Boleta, detalle_boleta


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.codigo = validated_data.get('codigo', instance.codigo)
        if 'imagen' in validated_data:
            instance.imagen = validated_data.get('imagen', instance.imagen)
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.precio = validated_data.get('precio', instance.precio)
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.categoria = validated_data.get('categoria', instance.categoria)
        instance.stock = validated_data.get('stock', instance.stock)
        instance.save()
        return instance
    
    def delete(self, instance):
        # Implementa el método delete para la eliminación de productos
        instance.delete()

class ElementoCarritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ElementoCarrito
        fields = '__all__'

class CarritoSerializer(serializers.ModelSerializer):
    elementos = ElementoCarritoSerializer(many=True, read_only=True)

    class Meta:
        model = Carrito
        fields = '__all__'

class BoletaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boleta
        fields = '__all__'

class detalle_boletaSerializer(serializers.ModelSerializer):
    class Meta:
        model = detalle_boleta
        fields = '__all__'