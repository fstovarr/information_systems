class ClientsController < ApplicationController
    def index
        render json: Client.all
    end

    def create
        Client.create(get_params)
    end

    def show
        @client = Client.find(params[:id])
        render json: @client
    end

    def update
        @client = Client.find params[:id]
        @client.update get_params
    end

    def destroy
        @client = Client.find(params[:id])
        @client.destroy
    end

    private
    def get_params
        params.require(:client).permit(:name, :address, :client_type, :phone)
    end
end
