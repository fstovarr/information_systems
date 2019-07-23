Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
<<<<<<< HEAD
  resources :clients, :products, :inventories
=======
  resources :products

  resources :inventories do
    collection do
      put 'sell'
      get 'get_sell', to: :get_sell
      get 'get_full'
    end
  end
>>>>>>> develop

  resources :raw_materials do
    member do
      put 'raw_materials_discount'
    end

    collection do
    get 'get_history', to: :get_history
    get 'get_expenses', to: :get_expenses
  end
  end
  resources :clients do
    collection do
    get 'show_suppliers', to: :show_suppliers
    get 'show_clients'
  end
  end
  
end
