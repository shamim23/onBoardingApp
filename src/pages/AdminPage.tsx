import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { useAdminStore, ComponentType } from '../store/adminStore';

const CONFIG_ID = 'admin_config'; // Static identifier for the config entry

export default function AdminPage() {
  const { pageTwo, pageThree, setPageConfig } = useAdminStore();
  const components: ComponentType[] = ['about', 'address', 'birthdate'];

  const handleComponentToggle = (page: 'two' | 'three', component: ComponentType) => {
    const currentConfig = page === 'two' ? pageTwo : pageThree;
    const otherConfig = page === 'two' ? pageThree : pageTwo;
    const otherPage = page === 'two' ? 'three' : 'two';
  
    if (currentConfig.includes(component)) {
      // Remove component if it exists and there's more than one component
      if (currentConfig.length > 1) {
        const newConfig = currentConfig.filter((c) => c !== component);
        setPageConfig(page, newConfig);
      }
    } else {
      // Add component to the current page and remove from the other page if it exists there
      const newCurrentConfig = [...currentConfig, component];
      const newOtherConfig = otherConfig.filter((c) => c !== component);
      
      // Ensure the other config has at least one component
      if (newOtherConfig.length === 0) {
        // If removing the component would make the other page empty,
        // move the first component from the current page to the other page
        newCurrentConfig.shift();
        newOtherConfig.push(currentConfig[0]);
      }
      
      setPageConfig(page, newCurrentConfig);
      setPageConfig(otherPage, newOtherConfig);
    }
  };

  const handleSave = async () => {
    const configToSave = {
      pageTwo,
      pageThree,
    };

    const { error } = await supabase
      .from('admin_configs')
      .update({ config: configToSave })
      .eq('config_id', CONFIG_ID);

    if (error) {
      console.error('Error saving config:', error);
    } else {
      console.log('Configuration saved successfully!');
    }
  };

  useEffect(() => {
    const fetchConfiguration = async () => {
      const { data, error } = await supabase
        .from('admin_configs')
        .select('config')
        .eq('config_id', CONFIG_ID)
        .single();

      if (error) {
        console.error('Error fetching config:', error);
      } else if (data) {
        const { pageTwo, pageThree } = data.config;
        setPageConfig('two', pageTwo);
        setPageConfig('three', pageThree);
      }
    };

    fetchConfiguration();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Settings className="h-8 w-8 text-indigo-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Onboarding Flow Configuration</h1>
        </div>

        <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Page 2 Components</h2>
            <div className="grid grid-cols-3 gap-4">
              {components.map((component) => (
                <label
                  key={component}
                  className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={pageTwo.includes(component)}
                    onChange={() => handleComponentToggle('two', component)}
                    disabled={pageTwo.length === 1 && pageTwo.includes(component)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-900 capitalize">
                    {component}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Page 3 Components</h2>
            <div className="grid grid-cols-3 gap-4">
              {components.map((component) => (
                <label
                  key={component}
                  className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={pageThree.includes(component)}
                    onChange={() => handleComponentToggle('three', component)}
                    disabled={pageThree.length === 1 && pageThree.includes(component)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-900 capitalize">
                    {component}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button 
          className='mt-6 flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700' 
          onClick={handleSave}
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
}

