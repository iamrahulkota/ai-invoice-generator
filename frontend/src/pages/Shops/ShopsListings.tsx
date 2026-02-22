import SearchBar from '@/components/common/SearchBar'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PlusIcon } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import { useNavigate } from "react-router";

const SHOPS_FILTERS = [
    {
        label: 'All',
        value: 'all',
    },
    {
        label: 'Active',
        value: 'active',
    },
    {
        label: 'Inactive',
        value: 'inactive',
    },
]

export default function ShopsListings() {

    const navigate = useNavigate();

    const [activeValue, setActiveValue] = useState<string>('');
    const [query, setQuery] = useState<string | null>(null);
    const [params, setParams] = useState<any>({
        per_page: 10,
        page_no: 1,
    });

    const handleParamsOnChange = (Key: string, value: any) => {
        const newParams = { ...params, [Key]: value };
        setParams(newParams);
    }

    const AddNewShop = () => {
        navigate('add-new-shop');
    }

    const handleSearch = () => {
        const newParams: any = { ...params };
        if (query && query?.length > 0) {
            newParams['search'] = query;
        } else {
            delete newParams['search'];
        }
        setParams(() => newParams);
    };

    const debounceTimer = useRef<any>(null);

    useEffect(() => {
        if (query === null) return;

        debounceTimer.current = setTimeout(() => {
            handleSearch();
        }, 500);
        return () => clearTimeout(debounceTimer.current);
    }, [query]);


    return (
        <div className='space-y-4'>
            {/* Dashboard Analytics for all the shops */}
            <div className=''></div>

            {/* Create & listings shops */}
            <div className='space-y-2'>
                <div className='flex flex-wrap gap-2 items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <Button
                            variant='outline'
                            size='sm'
                            onClick={AddNewShop}
                        >
                            <PlusIcon className='size-4' />
                            Add New Shop
                        </Button>
                        <SearchBar
                            query={[query, setQuery]}
                            placeholder="Search..."
                        />
                    </div>
                    <Select
                        value={activeValue}
                        onValueChange={(value) => {
                            setActiveValue(value);
                            handleParamsOnChange('search', value);
                        }}
                    >
                        <SelectTrigger size='sm' className=''>
                            <SelectValue placeholder='Select a shop' />
                        </SelectTrigger>
                        <SelectContent className=''>
                            {SHOPS_FILTERS.map((filter) => (
                                <SelectItem key={filter.value} value={filter.value}>
                                    {filter.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className=''></div>
            </div>
        </div>
    )
}
