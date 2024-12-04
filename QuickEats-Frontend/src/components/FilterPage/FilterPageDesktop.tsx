import { filterOptions } from "@/utils/filterOptions";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useRestaurantStore } from "@/store/restaurantStore";

export type FilterOptionsState = {
  id: string;
  label: string;
};

const FilterPage = () => {
  const { manageAppliedFilter, appliedFilter} = useRestaurantStore();

  const appliedFilterHandler = (value: string) => {    
    manageAppliedFilter(value);
  };

  return (
    <div className="border rounded-lg px-4 max-h-[500px] min-w-[250px] overflow-y-auto hidden lg:block fixed">
      <div className="flex items-center justify-between">
        <h1 className="font-medium md:font-bold text-lg tracking-wide mt-2">Filters</h1>
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
};

export default FilterPage;