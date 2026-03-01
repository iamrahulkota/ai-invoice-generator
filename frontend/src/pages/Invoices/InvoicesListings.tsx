import { load_invoice_list, load_shop_data, create_invoice, delete_invoice } from "@/redux/Action/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import CustomShadcnTable from "@/components/common/CustomShadcnTable";
import ToggleGroup from "@/components/common/ToggleGroup";
import SearchBar from "@/components/common/SearchBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Loader2, Pencil,PlusIcon, Trash } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import InvoiceCard from "./InvoiceCard";

export default function InvoicesListings() {
  const { shopId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shop_data, invoice_list, invoice_list_meta } = useSelector((state: any) => state.data);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alignment, setAlignment] = useState<'grid' | 'list'>('grid');
  const [query, setQuery] = useState<string | null>(null);
  const [params, setParams] = useState<any>({});

  // Fetch shop details
  useEffect(() => {
    if (!shopId) return;
    const fetchShopDetails = async () => {
      try {
        const response = await load_shop_data(dispatch, shopId);
        if (!response?.meta?.status) {
          throw new Error("Failed to fetch shop details");
        }
      } catch (error) {
        console.error("Error fetching shop details:", error);
      }
    };

    fetchShopDetails();
  }, [shopId]);

  // Fetch invoice list when params change
  useEffect(() => {
    const fetchInvoiceList = async () => {
      try {
        await load_invoice_list(dispatch, { ...params });
      } catch (error) {
        console.error("Error fetching invoice list:", error);
      }
    };

    fetchInvoiceList();
  }, [params]);

  const handleParamsOnChange = (Key: string, value: any) => {
    const newParams = { ...params, [Key]: value };
    setParams(newParams);
  };

  const handleAlignment = (newAlignment: any) => {
    if (!newAlignment) return;
    setAlignment(newAlignment);
  };

  const AddNewInvoice = () => {
    navigate("add-new-invoice");
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


  const handleViewInvoice = (item: any) => {
    navigate(`${item._id}`);
  };

  const handleEditInvoice = (item: any) => {
    navigate(`edit-invoice/${item._id}`);
  }

  const handleDeleteInvoice = async(item: any) => {
    const response = await delete_invoice(item._id);
    if (response?.meta?.status) {
      load_invoice_list(dispatch, {...params});
      toast.success(response?.meta?.message);
    } else {
      toast.error(response?.meta?.message || "Failed to delete the invoice");
    }
  }

  const menuOptions = [
    {
      label: 'View',
      icon: IconEye,
      onClick: (item: any) => handleViewInvoice(item),
    },
    {
      label: 'Edit',
      icon: IconPencil,
      onClick: (item: any) => handleEditInvoice(item),
    },
    {
      label: 'Delete',
      icon: IconTrash,
      onClick: (item: any) => handleDeleteInvoice(item),
      className: 'text-destructive',
    },
  ]

  const headCells = [
    {
      key: "invoice_number",
      label: "Invoice Number",
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
            <Button variant="outline" size="icon-sm" onClick={() => handleViewInvoice(item)}>
              <Eye className="size-3" />
            </Button>
            <Button variant="outline" size="icon-sm" onClick={() => handleEditInvoice(item)}>
              <Pencil className="size-3" />
            </Button>
            <Button variant="outline" size="icon-sm" onClick={() => handleDeleteInvoice(item)}>
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
            <Button variant="outline" size="sm" onClick={AddNewInvoice}>
              <PlusIcon className="size-4" />
              Add New Invoice
            </Button>
            <SearchBar query={[query, setQuery]} placeholder="Search..." />
          </div>
          <div className="flex items-center gap-2">
            <ToggleGroup
              alignment={alignment}
              handleAlignment={handleAlignment}
            />
          </div>
        </div>
        <div className="">
          {isLoading ? (
            <Loader2 className="size-6 animate-spin mx-auto my-20" />
          ) : invoice_list && invoice_list.length > 0 ? (
            alignment === 'grid' ? (
              <div
                className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-4"
              >
                {invoice_list.map((item: any, index: number) => (
                    <InvoiceCard key={index} item={item} menuOptions={menuOptions} handleViewInvoice={handleViewInvoice} />
                ))}
              </div>
            ) : (
               <CustomShadcnTable
                  headCells={headCells}
                  data={invoice_list}
                  pagination={false}
                  setParams={setParams}
                  meta_data={invoice_list_meta}
              />
            )
          ) : (
            <p className="text-center py-20">No invoices found.</p>
          )}
        </div>
      </div>
    </div>
  )
}
