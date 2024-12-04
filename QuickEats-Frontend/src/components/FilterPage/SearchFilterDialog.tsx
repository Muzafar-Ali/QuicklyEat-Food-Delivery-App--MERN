
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { SlidersHorizontal } from 'lucide-react';
import FilterPageMobile from './FilterPageMobile';

const SearchFilterDialog = ({appliedFilter}: {appliedFilter: string[]}) => {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <div className={`border p-2 rounded-md shadow-lg dark:shadow-[rgba(255,255,255,0.1)] ${appliedFilter?.length > 0 ? 'hidden': 'block'}`}>
        <SlidersHorizontal className="text-gray-500 inset-y-2 cursor-pointer"/>
      </div>
    </DialogTrigger>
    <DialogContent className="max-w-[500px]">
      <DialogHeader>
        <DialogTitle className="text-start">Filters</DialogTitle>
      </DialogHeader>
      <FilterPageMobile/>
    </DialogContent>
  </Dialog>
  );
};

export default SearchFilterDialog;
