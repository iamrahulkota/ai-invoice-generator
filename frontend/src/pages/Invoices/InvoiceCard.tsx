import MenuComp from "@/components/common/MenuComp";
import { Card } from "@/components/ui/card";
import { memo } from "react";
import { ShoppingBag } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const InvoiceCard = ({ item, menuOptions, handleViewInvoice }: {item: any; menuOptions: any; handleViewInvoice: (item: any) => void; }) => {
  console.log("InvoiceCard rendered for item:", item); // Debug log to check rendering

  const data = {
    ...item,
    id: item.id,
    is_active: item.is_active,
    shop_name: item.shop_name,
    shop_owner_name: item.shop_owner_name,
    house_no: item.address.house_no,
    building_name: item.address.building_name,
    district: item.address.district,
    state: item.address.state,
    pin_code: item.address.pin_code,
    contact_number: item.contact_number,
    shop_email: item.shop_email,
  };

  const handleCardClick = () => {
    handleViewInvoice(data);
  };

  return (
    <Card
      key={data.id}
      className="border border-dashed divide-dashed divide-border shadow-none hover:cursor-pointer p-3 hover:border-primary/20 transition-colors duration-200"
      onClick={handleCardClick}
    >
      <div className="space-y-1.5">
        <div
          className="flex justify-between items-center gap-2"
        >
          <div
            className="font-semibold truncate flex items-center gap-1.5 text-sm"
          >
            <div className="p-1.5 bg-sidebar text-sidebar-foreground rounded-md">
                <ShoppingBag className="size-4" strokeWidth={2} />
            </div>
            <span className="truncate">{data?.shop_name}</span>
          </div>
          <div className="flex items-center gap-1">
            <MenuComp
              item={data}
              menuOptions={menuOptions}
            />
          </div>
        </div>

        {/* Address Section */}
        <div className="text-xs space-y-1 text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-start text-sm">
                <p>{[data.house_no, data.building_name].filter(Boolean).join(" ")}</p>
                <p>
                    {[data.district, data.state].filter(Boolean).join(", ")}
                    {data.pin_code ? ` - ${data.pin_code}` : ""}
                </p>
                {/* <p>{[data.contact_number, data.shop_email].filter(Boolean).join(", ")}</p> */}
            </div>
          </div>
        </div>

        {/* Badge Section */}
        <div className="mt-4.5 text-xs text-muted-foreground flex gap-1">
          <Badge variant="outline" className="text-[11px]">
            {data.shop_owner_name}
          </Badge>
          <Badge variant="outline" className="text-[11px]">
            +91 {data.contact_number}
          </Badge>
        </div>

      </div>
    </Card>
  );
};

export default memo(InvoiceCard);
