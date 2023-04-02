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
import AddCardIcon from "@mui/icons-material/AddCard";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

const generalItems = [
  {
    href: "/dashboard",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
  },
];

const procurmentItems = [
  {
    href: "/procurment/addpurchasedmaterial",
    icon: <AddIcon fontSize="small" />,
    title: "Add Purchased Raw Material",
  },
  {
    href: "/procurment/addacssmaterial",
    icon: <AddIcon fontSize="small" />,
    title: "Add Purchased Accessories",
  },
  {
    href: "/procurment/requestedorders",
    icon: <UsersIcon fontSize="small" />,
    title: "Purchase Orders",
  },
];
const procurmentItems2 = [
  {
    href: "/procurment/addacssmaterial",
    icon: <AddIcon fontSize="small" />,
    title: "Add Purchased Material",
  },
  {
    href: "/procurment/requestedorders",
    icon: <UsersIcon fontSize="small" />,
    title: "Purchase Orders",
  },
];

const financeAccordion = [
  {
    icon: <Inventory2Icon fontSize="small" />,
    // endIcon: isExpand ? <ExpandMoreIcon fontSize="small"/> : <ExpandLessIcon fontSize="small"/>,    // endIconLess: <ExpandLessIcon fontSize="small"/>,
    title: "Expense List",
  },
];

const wareHouseItemsAccordion = [
  {
    icon: <Inventory2Icon fontSize="small" />,
    // endIcon: isExpand ? <ExpandMoreIcon fontSize="small"/> : <ExpandLessIcon fontSize="small"/>,    // endIconLess: <ExpandLessIcon fontSize="small"/>,
    title: "Stock List",
  },

  {
    icon: <FinishedGoodsIcon fontSize="small" />,
    title: "Finished Goods",
  },
  {
    icon: <AccessoriesIcon fontSize="small" />,
    title: "Accessories",
  },
  {
    icon: <UsersIcon fontSize="small" />,
    title: "Requested Items",
  },

  {
    icon: <CreateNewFolderIcon fontSize="small" />,
    title: "Register Original Products",
  },
];

const finishedAccordion = [
  {
    icon: <Inventory2Icon fontSize="small" />,
    // endIcon: isExpand ? <ExpandMoreIcon fontSize="small"/> : <ExpandLessIcon fontSize="small"/>,    // endIconLess: <ExpandLessIcon fontSize="small"/>,
    title: "Stock List",
  },
];

const wareHouseItems = [
  {
    href: "/warehouse/stockList/RawMaterial",
    icon: <RawmaterialIcon fontSize="small" />,
    title: "Raw Material",
  },
  {
    href: "/warehouse/Recieving",
    icon: <RecievingIcon fontSize="small" />,
    title: "Recieving",
  },

  {
    href: "/warehouse/accsRequestion",
    icon: <RecievingIcon fontSize="small" />,
    title: "Accessory Requisition",
  },
  {
    href: "/warehouse/PurchaseOrder",
    icon: <PurchaseOrderIcon fontSize="small" />,
    title: "Purchase Requisition",
  },
];

const production = [
  // {
  //   href: "/production/ProductionOrder",
  //   icon: <PendingActionsIcon fontSize="small" />,
  //   title: "Production Order",
  // },
  {
    href: "/production/productionOngoing",
    icon: <AutorenewIcon fontSize="small" />,
    title: "Production Approved",
  },
  {
    href: "/production/submitProduction",
    icon: <PurchaseOrderIcon fontSize="small" />,
    title: "Production Report",
  },
  {
    href: "/production/productionFinished",
    icon: <CheckCircleOutlineIcon fontSize="small" />,
    title: "Production Finished",
  },

  {
    href: "/production/OrderListGm",
    icon: <ViewListIcon fontSize="small" />,
    title: "Order List",
  },

  {
    href: "/production/finishedRequestion",
    icon: <ViewListIcon fontSize="small" />,
    title: "Requestion List",
  },

  {
    href: "/production/requestrawmaterials",
    icon: <AddIcon fontSize="small" />,
    title: "Raw material Requestion",
  },
];

const GMproduction = [
  {
    href: "/production/ProductionOrder",
    icon: <PendingActionsIcon fontSize="small" />,
    title: "Production Order",
  },
  {
    href: "/production/productionOngoing",
    icon: <AutorenewIcon fontSize="small" />,
    title: "Production Approved",
  },
  {
    href: "/production/submitProduction",
    icon: <PurchaseOrderIcon fontSize="small" />,
    title: "Production Report",
  },
  {
    href: "/production/productionFinished",
    icon: <CheckCircleOutlineIcon fontSize="small" />,
    title: "Production Finished",
  },

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

  {
    href: "/production/requestrawmaterials",
    icon: <AddIcon fontSize="small" />,
    title: "Raw material Requestion",
  },
  {
    href: "/production/rawmaterialValue",
    icon: <AddIcon fontSize="small" />,
    title: "Raw material value",
  },
];

const sales = [
  {
    href: "/dashboard/uncollected",
    icon: <PurchaseOrderIcon fontSize="small" />,
    title: "Uncollected Sales",
  },
  {
    href: "/sales/salesorderlist",
    icon: <RequestedIcon fontSize="small" />,
    title: "Sales Order List",
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
    href: "/sales/finishedRequestion",
    icon: <ViewListIcon fontSize="small" />,
    title: "Finished Good Requestion",
  },
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

const FinishedItems = [
  {
    href: "/warehouse/finishedGoods/PPR_PIPES",
    icon: <FinishedGoodsIcon fontSize="small" />,
    title: "PPR PIPES",
  },
  {
    href: "/warehouse/finishedGoods/UPVC_PIPES",
    icon: <FinishedGoodsIcon fontSize="small" />,
    title: "UPVC PIPES",
  },
  {
    href: "/warehouse/finishedGoods/HDPE_PIPES",
    icon: <FinishedGoodsIcon fontSize="small" />,
    title: "HDPE PIPES",
  },
  {
    href: "/warehouse/finishedGoods/UPVC_FITTINGS",
    icon: <FinishedGoodsIcon fontSize="small" />,
    title: "UPVC FITTINGS",
  },

  {
    href: "/warehouse/finishedGoods/PPR_FITTINGS",
    icon: <FinishedGoodsIcon fontSize="small" />,
    title: "PPR FITTINGS",
  },

  {
    href: "/warehouse/finishedGoods/CONDUTES",
    icon: <FinishedGoodsIcon fontSize="small" />,
    title: "CONDUITS",
  },
];

const NewMaterial = [
  {
    href: "/warehouse/newMaterial/rawMaterials",
    icon: <CreateNewFolderIcon fontSize="small" />,
    title: "New Raw Material",
  },

  {
    href: "/warehouse/newMaterial/accessory",
    icon: <CreateNewFolderIcon fontSize="small" />,
    title: "New Accessory",
  },

  {
    href: "/warehouse/newMaterial/finishedGood",
    icon: <CreateNewFolderIcon fontSize="small" />,
    title: "New Finished Good",
  },
];

const showExpenseLists = [
  {
    href: "/finance/Expense/employeeFee",
    icon: <CreateNewFolderIcon fontSize="small" />,
    title: "Employee Fee",
  },

  {
    href: "/finance/Expense/waterBill",
    icon: <CreateNewFolderIcon fontSize="small" />,
    title: "Water Payment",
  },

  {
    href: "/finance/Expense/electricPayment",
    icon: <CreateNewFolderIcon fontSize="small" />,
    title: "Electric Payment",
  },
  {
    href: "/finance/Expense/phoneExpense",
    icon: <CreateNewFolderIcon fontSize="small" />,
    title: "Phone Expense",
  },
  {
    href: "/finance/Expense/fuelExpense",
    icon: <CreateNewFolderIcon fontSize="small" />,
    title: "Fuel Expense",
  },
  {
    href: "/finance/Expense/bankloanPayment",
    icon: <CreateNewFolderIcon fontSize="small" />,
    title: "Bank Loan Payment",
  },
  {
    href: "/finance/Expense/otherExpense",
    icon: <CreateNewFolderIcon fontSize="small" />,
    title: "Other Expense",
  },
  {
    href: "/finance/Expense/allExpense",
    icon: <CreateNewFolderIcon fontSize="small" />,
    title: "All Expense",
  },
];

const AccessoriesItems = [
  {
    href: "/warehouse/accessories/mechanical",
    icon: <AccessoriesIcon fontSize="small" />,
    title: "Mechanical",
  },
  {
    href: "/warehouse/accessories/electrical",
    icon: <AccessoriesIcon fontSize="small" />,
    title: "Electrical",
  },
  {
    href: "/warehouse/accessories/recycle",
    icon: <AccessoriesIcon fontSize="small" />,
    title: "Consumable Goods",
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
    icon: <CreditScoreIcon fontSize="small" />,
    title: "Account Recieved",
  },

  {
    href: "/finance/batchandCost",
    icon: <CreditScoreIcon fontSize="small" />,
    title: "Approved Production Cost",
  },
  {
    href: "/finance/accountRecivableSales",
    icon: <CreditScoreIcon fontSize="small" />,
    title: "Sales List",
  },
  {
    href: "/finance/pettycash",
    icon: <PaymentIcon fontSize="small" />,
    title: "Generate Profit",
  },
  {
    href: "/finance/addpettycash",
    icon: <PaymentIcon fontSize="small" />,
    title: "Sales With Profit",
  },
  {
    href: "/finance/assetmanagment",
    icon: <AccountBalanceIcon fontSize="small" />,
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
          //  backgroundColor: "#7F675B"
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
        <Divider sx={{ borderColor: "#F8F7F4", opacity: ".2", my: 3 }} />
        {isSuperAdmin ? (
          <>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="menuTitle">GENERAL</Typography>
              {generalItems.map((item) => (
                <>
                  <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
                </>
              ))}
            </Box>
            <Divider sx={{ borderColor: "#F8F7F4", opacity: ".2", my: 3 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="menuTitle">PROCURMENT</Typography>
              {procurmentItems.map((item) => (
                <>
                  <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
                </>
              ))}
            </Box>
            <Divider sx={{ borderColor: "#F8F7F4", opacity: ".2", my: 3 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="menuTitle">WARE HOUSE</Typography>
              <Box sx={{ marginTop: "2vh" }}>
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                  sx={{
                    backgroundColor: "rgb(38, 28, 16)",
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
                    backgroundColor: "rgb(38, 28, 16)",
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
                      icon={<FinishedGoodsIcon />}
                      title={wareHouseItemsAccordion[1].title}
                      sx={{ marginBottom: -2, marginTop: -2 }}
                    />
                    {/* <Typography>Accordion 1</Typography> */}
                  </AccordionSummary>
                  <AccordionDetails>
                    {FinishedItems.map((item) => (
                      <NavItem
                        key={item.title}
                        icon={item.icon}
                        href={item.href}
                        title={item.title}
                      />
                    ))}
                  </AccordionDetails>
                </Accordion>
                {/* //////////////////////////////// here */}
                <Accordion
                  expanded={expanded === "panel3"}
                  onChange={handleChange("panel3")}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    backgroundColor: "rgb(38, 28, 16)",
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
                      icon={<AccessoriesIcon />}
                      title={wareHouseItemsAccordion[2].title}
                      sx={{ marginBottom: -2, marginTop: -2 }}
                    />
                    {/* <Typography>Accordion 1</Typography> */}
                  </AccordionSummary>
                  <AccordionDetails>
                    {AccessoriesItems.map((item) => (
                      <NavItem
                        key={item.title}
                        icon={item.icon}
                        href={item.href}
                        title={item.title}
                      />
                    ))}
                  </AccordionDetails>
                </Accordion>
                {/* ////////////////////////// here */}
                <Accordion
                  expanded={expanded === "panel4"}
                  onChange={handleChange("panel4")}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    backgroundColor: "rgb(38, 28, 16)",
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
                      title={wareHouseItemsAccordion[3].title}
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
                <Accordion
                  expanded={expanded === "panel5"}
                  onChange={handleChange("panel5")}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    backgroundColor: "rgb(38, 28, 16)",
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
                      icon={<CreateNewFolderIcon />}
                      title={wareHouseItemsAccordion[4].title}
                      sx={{ marginBottom: -2, marginTop: -2 }}
                    />
                    {/* <Typography>Accordion 1</Typography> */}
                  </AccordionSummary>
                  <AccordionDetails>
                    {NewMaterial.map((item) => (
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
            <Divider sx={{ borderColor: "#F8F7F4", opacity: ".2", my: 3 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="menuTitle">PRODUCTION</Typography>
              {GMproduction.map((item) => (
                <>
                  <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
                </>
              ))}
            </Box>
            <Divider sx={{ borderColor: "#F8F7F4", opacity: ".2", my: 3 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="menuTitle">SALES</Typography>

              {sales.map((item) => (
                <>
                  <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
                </>
              ))}
            </Box>
            <Divider sx={{ borderColor: "#F8F7F4", opacity: ".2", my: 3 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="menuTitle">FINANCE</Typography>
              <Accordion
                expanded={expanded === "panel5"}
                onChange={handleChange("panel5")}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{
                  backgroundColor: "rgb(38, 28, 16)",
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
                    icon={<CreateNewFolderIcon />}
                    title={financeAccordion[0].title}
                    sx={{ marginBottom: -2, marginTop: -2 }}
                  />
                  {/* <Typography>Accordion 1</Typography> */}
                </AccordionSummary>
                <AccordionDetails>
                  {showExpenseLists.map((item) => (
                    <NavItem
                      key={item.title}
                      icon={item.icon}
                      href={item.href}
                      title={item.title}
                    />
                  ))}
                </AccordionDetails>
              </Accordion>
              {Finance.map((item) => (
                <>
                  <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
                </>
              ))}
            </Box>
            <Divider sx={{ borderColor: "#F8F7F4", opacity: ".2", my: 3 }} />
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
                  backgroundColor: "rgb(38, 28, 16)",
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
                  backgroundColor: "rgb(38, 28, 16)",
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
                    icon={<FinishedGoodsIcon />}
                    title={wareHouseItemsAccordion[1].title}
                    sx={{ marginBottom: -2, marginTop: -2 }}
                  />
                  {/* <Typography>Accordion 1</Typography> */}
                </AccordionSummary>
                <AccordionDetails>
                  {FinishedItems.map((item) => (
                    <NavItem
                      key={item.title}
                      icon={item.icon}
                      href={item.href}
                      title={item.title}
                    />
                  ))}
                </AccordionDetails>
              </Accordion>
              {/* //////////////////////////////// here */}
              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{
                  backgroundColor: "rgb(38, 28, 16)",
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
                    icon={<AccessoriesIcon />}
                    title={wareHouseItemsAccordion[2].title}
                    sx={{ marginBottom: -2, marginTop: -2 }}
                  />
                  {/* <Typography>Accordion 1</Typography> */}
                </AccordionSummary>
                <AccordionDetails>
                  {AccessoriesItems.map((item) => (
                    <NavItem
                      key={item.title}
                      icon={item.icon}
                      href={item.href}
                      title={item.title}
                    />
                  ))}
                </AccordionDetails>
              </Accordion>
              {/* ////////////////////////// here */}
              <Accordion
                expanded={expanded === "panel4"}
                onChange={handleChange("panel4")}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{
                  backgroundColor: "rgb(38, 28, 16)",
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
                    title={wareHouseItemsAccordion[3].title}
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
              <Accordion
                expanded={expanded === "panel5"}
                onChange={handleChange("panel5")}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{
                  backgroundColor: "rgb(38, 28, 16)",
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
                    icon={<CreateNewFolderIcon />}
                    title={wareHouseItemsAccordion[4].title}
                    sx={{ marginBottom: -2, marginTop: -2 }}
                  />
                  {/* <Typography>Accordion 1</Typography> */}
                </AccordionSummary>
                <AccordionDetails>
                  {NewMaterial.map((item) => (
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
        ) : user.role === "Finance" ? (
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="menuTitle">Finance</Typography>
            <Accordion
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{
                backgroundColor: "rgb(38, 28, 16)",
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
                  icon={<CreateNewFolderIcon />}
                  title={financeAccordion[0].title}
                  sx={{ marginBottom: -2, marginTop: -2 }}
                />
                {/* <Typography>Accordion 1</Typography> */}
              </AccordionSummary>
              <AccordionDetails>
                {showExpenseLists.map((item) => (
                  <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
                ))}
              </AccordionDetails>
            </Accordion>
            {Finance.map((item) => (
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
