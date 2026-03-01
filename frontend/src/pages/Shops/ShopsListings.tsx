import CustomShadcnTable from "@/components/common/CustomShadcnTable";
import SearchBar from "@/components/common/SearchBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { delete_shop, load_shop_list } from "@/redux/Action/actions";
import { Eye, Loader2, Pencil,PlusIcon, Trash } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const SHOPS_FILTERS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Inactive",
    value: "in-active",
  },
];

export default function ShopsListings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shop_list, shop_list_meta } = useSelector((state: any) => state.data);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeValue, setActiveValue] = useState<string>("");
  const [query, setQuery] = useState<string | null>(null);
  const [params, setParams] = useState<any>({
  });

  useEffect(() => {
    const fetchShops = async () => {
      try {
        setIsLoading(true);
        await load_shop_list(dispatch, {...params});
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShops();
  }, [params]);

  const handleParamsOnChange = (Key: string, value: any) => {
    const newParams = { ...params, [Key]: value };
    setParams(newParams);
  };

  const AddNewShop = () => {
    navigate("add-new-shop");
  };

  const handleSearch = () => {
    const newParams: any = { ...params };
    if (query && query?.length > 0) {
      newParams["search"] = query;
    } else {
      delete newParams["search"];
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


  const handleViewShop = (item: any) => {
    navigate(`${item._id}`);
  };

  const handleEditShop = (item: any) => {
    navigate(`edit-shop/${item._id}`);
  }

  const handleDeleteShop = async(item: any) => {
    const response = await delete_shop(item._id);
    if (response?.meta?.status) {
      toast.success(response?.meta?.message);
    } else {
      toast.error(response?.meta?.message || "Failed to delete the shop");
    }
  }

  const headCells = [
    {
      key: "shop_name",
      label: "Shop Name",
      type: "text",
    },
    {
      key: "shop_owner_name",
      label: "Owner",
      type: "text",
    },
    {
      key: "address",
      label: "Address",
      type: "custom",
      render: (item: any) => {
        const { house_no, building_name, district, state, pin_code } = item.address || {};

        return (
          <div className="flex flex-col items-start gap-1 text-sm">
            <p>{[house_no, building_name].filter(Boolean).join(" ")}</p>
            <p>
              {[district, state].filter(Boolean).join(", ")}
              {pin_code ? ` - ${pin_code}` : ""}
            </p>
          </div>
        );
      },
    },
    {
      key: "contact_info",
      label: "Contact Info",
      type: "custom",
      render: (item: any) => {
        return (
          <div className="flex flex-col items-start gap-1.5">
            <p>{item.shop_email}</p>
            <p>+91 {item.contact_number}</p>
          </div>
        );
      },
    },
    {
      key: "notes",
      label: "Notes",
      type: "text",
    },
    {
      key: "is_active",
      label: "Status",
      type: "custom",
      render: (item: any) => {
        return (
          <Badge variant={item.is_active ? "secondary" : "destructive"} className="text-xs px-2 py-0.5">
            {item.is_active ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
    {
      key: "actions",
      label: "Actions",
      type: "custom",
      render: (item: any) => {
        return (
          <div className="flex gap-1.5 items-center">
            <Button variant="outline" size="icon-sm" onClick={() => handleViewShop(item)}>
              <Eye className="size-3" />
            </Button>
            <Button variant="outline" size="icon-sm" onClick={() => handleEditShop(item)}>
              <Pencil className="size-3" />
            </Button>
            <Button variant="outline" size="icon-sm" onClick={() => handleDeleteShop(item)}>
              <Trash className="size-3" />
            </Button>
          </div>
        );
      },
    }
  ];

  return (
    <div className="space-y-4">
      {/* Dashboard Analytics for all the shops */}
      <div className=""></div>

      {/* Create & listings shops */}
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={AddNewShop}>
              <PlusIcon className="size-4" />
              Add New Shop
            </Button>
            <SearchBar query={[query, setQuery]} placeholder="Search..." />
          </div>
          <Select
            value={activeValue}
            onValueChange={(value) => {
              setActiveValue(value);
              handleParamsOnChange("status", value);
            }}
          >
            <SelectTrigger size="sm" className="">
              <SelectValue placeholder="Select a shop" />
            </SelectTrigger>
            <SelectContent className="">
              {SHOPS_FILTERS.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="">
          {isLoading ? (
            <Loader2 className="size-6 animate-spin mx-auto my-20" />
          ) : (
            <CustomShadcnTable
              idPrefix="shops-list-table"
              headCells={headCells}
              data={shop_list}
              setParams={setParams}
              meta_data={shop_list_meta?.pagination || params}
            />
          )}
        </div>
      </div>
    </div>
  );
}
