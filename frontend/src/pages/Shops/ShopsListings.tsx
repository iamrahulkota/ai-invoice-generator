import SearchBar from '@/components/common/SearchBar'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { load_shops_list } from '@/redux/Action/actions'
import { PlusIcon } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
    const dispatch = useDispatch();
    const { shops_list } = useSelector((state: any) => state.data);


    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [activeValue, setActiveValue] = useState<string>('');
    const [query, setQuery] = useState<string | null>(null);
    const [params, setParams] = useState<any>({
        per_page: 10,
        page_no: 1,
    });

    useEffect(() => {
        const fetchShops = async () => {
            try {
                setIsLoading(true);
                await load_shops_list(dispatch);
                console.log("SHOP LIST: ", shops_list);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchShops();
    }, []);


    // useEffect(() => {
    //     console.log("shops_list", shops_list);
    // }, [shops_list]);

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
