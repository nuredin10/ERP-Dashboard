import { useState, useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { Cog as CogIcon } from "../icons/cog";
import { Lock as LockIcon } from "../icons/lock";
import { Selector as SelectorIcon } from "../icons/selector";
import { ShoppingBag as ShoppingBagIcon } from "../icons/shopping-bag";
import { User as UserIcon } from "../icons/user";
import { UserAdd as UserAddIcon } from "../icons/user-add";
import { Users as UsersIcon } from "../icons/users";
import { XCircle as XCircleIcon } from "../icons/x-circle";
import { Google as Google } from "../icons/google";
import { Logo } from "./logo";
import Image from "next/image";
import { NavItem } from "./nav-item";
import { DropdownNavItem } from "./dropdown-nav-item";
import BarChartIcon from "@mui/icons-material/BarChart";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ListAltIcon from "@mui/icons-material/ListAlt";
import EmailIcon from "@mui/icons-material/Email";
import ChatIcon from "@mui/icons-material/Chat";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Supplier as SupplierIcon } from "../icons/supplier";
import { Warehouse as WarehouseIcon } from "../icons/warehouse";
import { Rawmaterial as RawmaterialIcon } from "../icons/rawmaterial";
import { Accessories as AccessoriesIcon } from "../icons/accessories";
import { FinishedGoods as FinishedGoodsIcon } from "../icons/finishedGoods";
import { Requested as RequestedIcon } from "../icons/requested";
import { Recieving as RecievingIcon } from "../icons/recieving";
import { PurchaseOrder as PurchaseOrderIcon } from "../icons/purchaseOrder";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ViewListIcon from "@mui/icons-material/ViewList";
import StoreIcon from "@mui/icons-material/Store";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import AddIcon from "@mui/icons-material/Add";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PaymentIcon from "@mui/icons-material/Payment";

const generalItems = [
  {
    href: "/dashboard",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/finance",
    icon: <ShoppingBagIcon fontSize="small" />,
    title: "Finance",
  },
  // {
  //   href: "/analytics",
  //   icon: <BarChartIcon fontSize="small" />,
  //   title: "Analytics",
  // },
];

const procurmentItems = [
  {
    href: "/procurment/addpurchasedmaterial",
    icon: <AddIcon fontSize="small" />,
    title: "Add Purchased Material",
  },
  {
    href: "/procurment/requestedorders",
    icon: <UsersIcon fontSize="small" />,
    title: "Purchase Orders",
  },
  // {
  //   href: "/procurment/paymentrequest",
  //   icon: <UsersIcon fontSize="small" />,
  //   title: "Payment Request",
  // },
];

const wareHouseItemsAccordion = [
  {
    icon: <Inventory2Icon fontSize="small" />,
    // endIcon: isExpand ? <ExpandMoreIcon fontSize="small"/> : <ExpandLessIcon fontSize="small"/>,    // endIconLess: <ExpandLessIcon fontSize="small"/>,
    title: "Stock List",
  },
  {
    icon: <UsersIcon fontSize="small" />,
    title: "Requested Items",
    // endIcon: isExpand ? <ExpandMoreIcon fontSize="small"/> : <ExpandLessIcon fontSize="small"/>,
    // endIconLess: <ExpandLessIcon fontSize="small"/>,
  },
];

const wareHouseItems = [
  {
    href: "/warehouse/Recieving",
    icon: <RecievingIcon fontSize="small" />,
    title: "Recieving",
  },
  {
    href: "/warehouse/PurchaseOrder",
    icon: <PurchaseOrderIcon fontSize="small" />,
    title: "Purchase Requisition",
  },
];

const production = [
  {
    href: "/production/ProductionOrder",
    icon: <PendingActionsIcon fontSize="small" />,
    title: "Production Order",
  },
  {
    href: "/production/productionOngoing",
    icon: <AutorenewIcon fontSize="small" />,
    title: "Production Ongoing",
  },
  {
    href: "/production/productionFinished",
    icon: <CheckCircleOutlineIcon fontSize="small" />,
    title: "Production Finished",
  },
  {
    href: "/production/addnewbatch",
    icon: <PurchaseOrderIcon fontSize="small" />,
    title: "Add New Batch",
  },
  {
    href: "/production/viewbatch",
    icon: <ViewListIcon fontSize="small" />,
    title: "View Batch",
  },
  // {
  //   href: "/production/addnewbatch",
  //   icon: <PurchaseOrderIcon fontSize="small" />,
  //   title: "Add New Batch",
  // },
  // {
  //   href: "/production/addproduct",
  //   icon: <PurchaseOrderIcon fontSize="small" />,
  //   title: "Order Production",
  // },
  {
    href: "/production/OrderListGm",
    icon: <ViewListIcon fontSize="small" />,
    title: "Order List",
  },

  {
    href: "/production/GMProductionOrder",
    icon: <PurchaseOrderIcon fontSize="small" />,
    title: "Add Production Order",
  },
  // {
  //   href: "/production/viewallproducts",
  //   icon: <ViewListIcon fontSize="small" />,
  //   title: "View All Products",
  // },
];

const sales = [
  {
    href: "/sales/salesorderlist",
    icon: <RequestedIcon fontSize="small" />,
    title: "Sales Order List",
  },
  {
    href: "/sales/viewitemrecieved",
    icon: <RecievingIcon fontSize="small" />,
    title: "View Item Recieved",
  },
  {
    href: "/sales/vender",
    icon: <ViewListIcon fontSize="small" />,
    title: "Customers list (CRM)",
  },
  {
    href: "/sales/salesorder",
    icon: <PurchaseOrderIcon fontSize="small" />,
    title: "Sales Order",
  },
  {
    href: "/sales/salessummery",
    icon: <PurchaseOrderIcon fontSize="small" />,
    title: "Sales Summery",
  },
  // {
  //   href: "/sales/salessummery",
  //   icon: <SummarizeIcon fontSize="small" />,
  //   title: "Sales Summery",
  // },
];

const StockListItems = [
  {
    href: "/warehouse/stockList/RawMaterial",
    icon: <RawmaterialIcon fontSize="small" />,
    title: "Raw Material",
  },
  {
    href: "/warehouse/stockList/Accessories",
    icon: <AccessoriesIcon fontSize="small" />,
    title: "Accessories",
  },
  {
    href: "/warehouse/stockList/FinishedGoods",
    icon: <FinishedGoodsIcon fontSize="small" />,
    title: "Finished Goods",
  },
  {
    href: "/warehouse/stockList/summary",
    icon: <SummarizeIcon fontSize="small" />,
    title: "Summary",
  },
];

const RequestedItems = [
  {
    href: "/warehouse/requesteditems/RawMaterial",
    icon: <RawmaterialIcon fontSize="small" />,
    title: "Raw Material",
  },
  {
    href: "/warehouse/requesteditems/Accessories",
    icon: <AccessoriesIcon fontSize="small" />,
    title: "Accessories",
  },
  {
    href: "/warehouse/requesteditems/FinishedGoods",
    icon: <FinishedGoodsIcon fontSize="small" />,
    title: "Finished Goods",
  },
];

const RegisterUser = [
  {
    href: "/register",
    icon: <UsersIcon fontSize="small" />,
    title: "Register a new User",
  },
];

const Finance = [
  {
    href: "/finance/accountpayable",
    icon: <PaymentIcon fontSize="small" />,
    title: "Account Payable",
  },
  {
    href: "/finance/accountrecieveable",
    icon: <PaymentIcon fontSize="small" />,
    title: "Account Recieved",
  },
  {
    href: "/finance/pettycash",
    icon: <PaymentIcon fontSize="small" />,
    title: "Petty Cash",
  },
  {
    href: "/finance/addpettycash",
    icon: <PaymentIcon fontSize="small" />,
    title: "Add Pettycash",
  },
  {
    href: "/finance/assetmanagment",
    icon: <PaymentIcon fontSize="small" />,
    title: "Asset Managment",
  },
];

export const DashboardSidebar = (props) => {
  const [expanded, setExpanded] = useState(false);
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const [isExpand, setIsExpand] = useState(false);

  const dropDownClickHandler = () => {
    setIsExpand((p) => !p);
  };

  const token = Cookies.get("token");
  const [user, setUser] = useState({});
  useEffect(() => {
    jwt.verify(token, "PROPLAST", (err, decoded) => {
      if (err) {
        console.log(err);
      } else {
        setUser(decoded);
        console.log("asdcasdc");
      }
    });
  }, []);

  const isSuperAdmin = user.role === "Super Admin" ? true : false;
  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", pt: 5 }}>
            <NextLink href="/" passHref>
              <a>
                <Image src="/LOGOLIGHT1.svg" height="100" width="200"></Image>
                {/* <Logo
                  sx={{
                    
                  }}
                  href='/logo.svg'
                /> */}
              </a>
            </NextLink>
          </Box>
        </div>
        <Divider sx={{ borderColor: "#2D3748", my: 3 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="menuTitle">GENERAL</Typography>
          {generalItems.map((item) => (
            <>
              <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
            </>
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748", my: 3 }} />

        {isSuperAdmin ? (
          <>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="menuTitle">PROCURMENT</Typography>
              {procurmentItems.map((item) => (
                <>
                  <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
                </>
              ))}
            </Box>
            <Divider sx={{ borderColor: "#2D3748", my: 3 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="menuTitle">WARE HOUSE</Typography>
              <Box sx={{ marginTop: "2vh" }}>
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                  sx={{
                    backgroundColor: "rgb(17, 24, 39)",
                    "&:before": {
                      display: "none",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <DropdownNavItem
                      icon={<WarehouseIcon />}
                      title={wareHouseItemsAccordion[0].title}
                      sx={{ marginBottom: -2, marginTop: -2 }}
                    />
                  </AccordionSummary>
                  <AccordionDetails>
                    {StockListItems.map((item) => (
                      <NavItem
                        key={item.title}
                        icon={item.icon}
                        href={item.href}
                        title={item.title}
                      />
                    ))}
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel2"}
                  onChange={handleChange("panel2")}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    backgroundColor: "rgb(17, 24, 39)",
                    "&:before": {
                      display: "none",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <DropdownNavItem
                      icon={<RequestedIcon />}
                      title={wareHouseItemsAccordion[1].title}
                      sx={{ marginBottom: -2, marginTop: -2 }}
                    />
                    {/* <Typography>Accordion 1</Typography> */}
                  </AccordionSummary>
                  <AccordionDetails>
                    {RequestedItems.map((item) => (
                      <NavItem
                        key={item.title}
                        icon={item.icon}
                        href={item.href}
                        title={item.title}
                      />
                    ))}
                  </AccordionDetails>
                </Accordion>
                <Box>
                  {wareHouseItems.map((item) => (
                    <>
                      <NavItem
                        sx={{ marginLeft: 1, maxWidth: " 90%" }}
                        key={item.title}
                        icon={item.icon}
                        href={item.href}
                        title={item.title}
                      />
                    </>
                  ))}
                </Box>
              </Box>
            </Box>
            <Divider sx={{ borderColor: "#2D3748", my: 3 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="menuTitle">PRODUCTION</Typography>
              {production.map((item) => (
                <>
                  <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
                </>
              ))}
            </Box>
            <Divider sx={{ borderColor: "#2D3748", my: 3 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="menuTitle">SALES</Typography>

              {sales.map((item) => (
                <>
                  <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
                </>
              ))}
            </Box>
            <Divider sx={{ borderColor: "#2D3748", my: 3 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="menuTitle">FINANCE</Typography>

              {Finance.map((item) => (
                <>
                  <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
                </>
              ))}
            </Box>
            <Divider sx={{ borderColor: "#2D3748", my: 3 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="menuTitle">USER</Typography>

              {RegisterUser.map((item) => (
                <>
                  <NavItem key={item.href} icon={item.icon} href={item.href} title={item.title} />
                </>
              ))}
            </Box>
          </>
        ) : user.role === "Ware House" ? (
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="menuTitle">WARE HOUSE</Typography>
            <Box sx={{ marginTop: "2vh" }}>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                sx={{
                  backgroundColor: "rgb(17, 24, 39)",
                  "&:before": {
                    display: "none",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <DropdownNavItem
                    icon={<WarehouseIcon />}
                    title={wareHouseItemsAccordion[0].title}
                    sx={{ marginBottom: -2, marginTop: -2 }}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  {StockListItems.map((item) => (
                    <NavItem
                      key={item.title}
                      icon={item.icon}
                      href={item.href}
                      title={item.title}
                    />
                  ))}
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{
                  backgroundColor: "rgb(17, 24, 39)",
                  "&:before": {
                    display: "none",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <DropdownNavItem
                    icon={<RequestedIcon />}
                    title={wareHouseItemsAccordion[1].title}
                    sx={{ marginBottom: -2, marginTop: -2 }}
                  />
                  {/* <Typography>Accordion 1</Typography> */}
                </AccordionSummary>
                <AccordionDetails>
                  {RequestedItems.map((item) => (
                    <NavItem
                      key={item.title}
                      icon={item.icon}
                      href={item.href}
                      title={item.title}
                    />
                  ))}
                </AccordionDetails>
              </Accordion>
              <Box>
                {wareHouseItems.map((item) => (
                  <>
                    <NavItem
                      sx={{ marginLeft: 1, maxWidth: " 90%" }}
                      key={item.title}
                      icon={item.icon}
                      href={item.href}
                      title={item.title}
                    />
                  </>
                ))}
              </Box>
            </Box>
          </Box>
        ) : user.role == "Production" ? (
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="menuTitle">PRODUCTION</Typography>
            {production.map((item) => (
              <>
                <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
              </>
            ))}
          </Box>
        ) : user.role === "Sales" ? (
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="menuTitle">SALES</Typography>

            {sales.map((item) => (
              <>
                <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
              </>
            ))}
          </Box>
        ) : user.role === "Procurment" ? (
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="menuTitle">PROCURMENT</Typography>
            {procurmentItems.map((item) => (
              <>
                <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
              </>
            ))}
          </Box>
        ) : null}
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
