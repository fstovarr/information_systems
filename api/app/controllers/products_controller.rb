class ProductsController < ApplicationController
    def index
        render json: Product.all
    end
    
    def create
        Product.create(get_params)
    end
    
    def show
        @product = Product.find(params[:id])
        render json: @product
    end
    
    def update
        @product = Product.find params[:id]
        @product.update get_params
    end 
    
    def destroy
        @product = Product.find(params[:id])
        @product.destroy
    end
    
    private
    def get_params
        params.require(:product).permit(:name, :descrption, :color, :size)
    end    
end