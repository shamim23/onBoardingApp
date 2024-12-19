import { ComponentType } from '../store/adminStore';
import { AboutMeComponent, AddressComponent, BirthdateComponent } from './FormComponents';

interface FormStepProps {
  components: ComponentType[];
  userData: any;
  updateUserData: (data: any) => void;
}

const componentMap = {
  about: AboutMeComponent,
  address: AddressComponent,
  birthdate: BirthdateComponent,
};

export function FormStep({ components, userData, updateUserData }: FormStepProps) {
  return (
    <div className="space-y-6">
      {components.map((componentType) => {
        const Component = componentMap[componentType];
        return Component ? (
          <Component 
            key={componentType} 
            value={componentType === 'address' ? userData.address : userData[componentType] || ''} 
            onChange={(value) => updateUserData({ [componentType]: value })} 
          />
        ) : null;
      })}
    </div>
  );
}