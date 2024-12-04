import { filterOptions } from "@/utils/filterOptions";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useRestaurantStore } from "@/store/restaurantStore";

export type FilterOptionsState = {
  id: string;
  label: string;
};


const FilterPageMobile = () => {
  const { manageAppliedFilter, appliedFilter, removeAppliedFilter } = useRestaurantStore();

  const appliedFilterHandler = (value: string) => {    
    manageAppliedFilter(value);
  };

  return (
    <div className="border rounded-lg px-4 max-h-screen overflow-y-auto">
      <div className="flex items-center justify-between">
      </div>
      {filterOptions.map((option) => (
        <div key={option.id} className="flex items-center space-x-2 my-5">
          <Checkbox
            id={option.id}
            checked={appliedFilter.includes(option.label)}
            onClick={() => appliedFilterHandler(option.label)}
          />
          <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  );
}

export default FilterPageMobile