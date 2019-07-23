class InventoriesController < ApplicationController
    def index
        render json: Inventory.all
    end
    
    def create
        Inventory.create(get_params)
    end
    
    def show
        @inventory = Inventory.find(params[:id])
        render json: @inventory
    end
    
    def update
        @inventory = Inventory.find params[:id]
        @inventory.update get_params
    end 
    
    def destroy
        @inventory = Inventory.find(params[:id])
        @inventory.destroy
    end
    
    private
    def get_params
        params.require(:Inventory).permit(:name, :descrption, :color, :size)
    end    
end