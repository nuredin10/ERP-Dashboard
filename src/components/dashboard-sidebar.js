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
import SummarizeIcon from '@mui/icons-material/Summarize';
import ViewListIcon from '@mui/icons-material/ViewList';
import StoreIcon from '@mui/icons-material/Store';

const generalItems = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/finance",
    icon: <ShoppingBagIcon fontSize="small" />,
    title: "Fincance",
  },
  {
    href: "/analytics",
    icon: <BarChartIcon fontSize="small" />,
    title: "Analytics",
  },
];

const procurmentItems = [
  {
    href: "/procurment/supplier",
    icon: <Google fontSize="small" />,
    title: "Supplier",
  },
  {
    href: "/procurment/purchaserequest",
    icon: <UsersIcon fontSize="small" />,
    title: "Purchase Request",
  },
  {
    href: "/procurment/paymentrequest",
    icon: <UsersIcon fontSize="small" />,
    title: "Payment Request",
  },
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
    title: "Purchase Order",
  },
];

const production = [
  {
    href: "/production/AllRawMaterials",
    icon: <RawmaterialIcon fontSize="small" />,
    title: "All Raw Materials",
  },
  {
    href: "/production/IssueMaterial",
    icon: <RequestedIcon fontSize="small" />,
    title: "Issue Material",
  },
  {
    href: "/production/StoreVoucher",
    icon: <StoreIcon fontSize="small" />,
    title: "Store Voucher",
  },
  {
    href: "/production/ViewAllProducts",
    icon: <ViewListIcon fontSize="small" />,
    title: "View All Products",
  },
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
    href: "/sales/salesquotation",
    icon: <SummarizeIcon fontSize="small" />,
    title: "Sales Summery",
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
          <Box sx={{ p: 3 }}>
            <NextLink href="/" 
              passHref>
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
              </a>
            </NextLink>
          </Box>
          {/* <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1
              }}
            >
              <div>
                <Typography
                  color="inherit"
                  variant="subtitle1"
                >
                  Acme Inc
                </Typography>
                <Typography
                  color="neutral.400"
                  variant="body2"
                >
                  Your tier
                  {' '}
                  : Premium
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: 'neutral.500',
                  width: 14,
                  height: 14
                }}
              />
            </Box>
          </Box> */}
        </div>
        <Divider sx={{ borderColor: "#2D3748", my: 3 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="menuTitle">GENERAL</Typography>
          {generalItems.map((item) => (
            <>
              <NavItem 
                key={item.title} 
                icon={item.icon} 
                href={item.href} 
                title={item.title} />
            </>
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748", my: 3 }} />
        {/* <Box sx={{ flexGrow: 1 }}>
          <Typography variant="menuTitle">PROCURMENT</Typography>
          {procurmentItems.map((item) => (
            <>
              <NavItem 
                key={item.title} 
                icon={item.icon} 
                href={item.href} 
                title={item.title} />
            </>
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748", my: 3 }} /> */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="menuTitle">Ware House</Typography>
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
                {/* <Typography>Accordion 1</Typography> */}
              </AccordionSummary>
              <AccordionDetails>
                {StockListItems.map((item) => (
                  <NavItem 
                    key={item.title} 
                    icon={item.icon} 
                    href={item.href} 
                    title={item.title} />
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
                    title={item.title} />
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
                    title={item.title} />
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
              <NavItem 
                key={item.title} 
                icon={item.icon} 
                href={item.href} 
                title={item.title} />
            </>
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748", my: 3 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="menuTitle">SALES</Typography>

          {sales.map((item) => (
            <>
              <NavItem 
                key={item.title} 
                icon={item.icon} 
                href={item.href} 
                title={item.title} />
            </>
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
        {/* <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          <Typography
            color="neutral.100"
            variant="subtitle2"
          >
            Need more features?
          </Typography>
          <Typography
            color="neutral.500"
            variant="body2"
          >
            Check out our Pro solution template.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              mt: 2,
              mx: 'auto',
              width: '160px',
              '& img': {
                width: '100%'
              }
            }}
          >
            <img
              alt="Go to pro"
              src="/static/images/sidebar_pro.png"
            />
          </Box>
          <NextLink
            href="https://material-kit-pro-react.devias.io/"
            passHref
          >
            <Button
              color="secondary"
              component="a"
              endIcon={(<OpenInNewIcon />)}
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
            >
              Pro Live Preview
            </Button>
          </NextLink>
        </Box> */}
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
