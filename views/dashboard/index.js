/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')
  
  module.exports = {
    // ...
    theme: {
      extend: {
        colors: {
          cyan: colors.cyan,
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentReportIcon,
  HomeIcon,
  MenuAlt1Icon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XIcon,
  //ChartPieIcon,
  //CashIcon,
  //NewspaperIcon,
  //ReceiptTaxIcon,
} from "@heroicons/react/outline";
import {
  CashIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  OfficeBuildingIcon,
  SearchIcon,
  ChartPieIcon,
  NewspaperIcon,
  ReceiptTaxIcon,
} from "@heroicons/react/solid";
import PortfolioCard from "./PortfolioCard";
import Reports from "./Reports";
import OverviewHeader from "./OverviewHeader";
import AggregateTable from "./AggregateTable";

// const navigation = [
//   { name: "Home", href: "#", icon: HomeIcon, current: true },
//   { name: "History", href: "#", icon: ClockIcon, current: false },
//   { name: "Balances", href: "#", icon: ScaleIcon, current: false },
//   { name: "Cards", href: "#", icon: CreditCardIcon, current: false },
//   { name: "Recipients", href: "#", icon: UserGroupIcon, current: false },
//   { name: "Reports", href: "#", icon: DocumentReportIcon, current: false },
// ];
// const secondaryNavigation = [
//   { name: "Settings", href: "#", icon: CogIcon },
//   { name: "Help", href: "#", icon: QuestionMarkCircleIcon },
//   { name: "Privacy", href: "#", icon: ShieldCheckIcon },
// ];
const cards = [
  {
    name: "Equity value",
    href: "/equity",
    icon: ChartPieIcon,
    amount: " ₹30,659.45",
  },
  {
    name: "Debt value",
    href: "/debt",
    icon: CashIcon,
    amount: " ₹40,659.45",
  },
  {
    name: "Mutual Funds value",
    href: "/mfunds",
    icon: NewspaperIcon,
    amount: " ₹50,659.45",
  },
  {
    name: "Options value",
    href: "/options",
    icon: ReceiptTaxIcon,
    amount: " ₹60,659.45",
  },
  // More items...
];
const transactions = [
  {
    id: 1,
    name: "Equity portfio value",
    href: "#",
    amount: "₹20,000",
    currency: "INR",
    status: "success",
    date: "July 11, 2020",
    datetime: "2020-07-11",
  },
  // More transactions...
];
const statusStyles = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardView() {
  //   const [sidebarOpen, setSidebarOpen] = useState(false);
  //   const total = 12313;
  return (
    <div className="relative h-screen flex overflow-hidden bg-gray-100">
      <div className="flex-1 overflow-auto focus:outline-none">
        <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
          {/* <OverviewHeader total={total} /> */}
          <div className="mt-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Portfolio Overview
              </h2>
              <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {/* Card */}
                {cards.map((card) => (
                  <PortfolioCard card={card} />
                ))}
              </div>
            </div>
            {/* <AggregateTable /> */}
            {/* <Reports transactions={transactions} /> */}
          </div>
        </main>
      </div>
    </div>
  );
}
