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

import OverviewHeader from "./Header";
//import Datatable from "./Datatable";
import EquityInputType from "./EquityInputType";
import EquityDataForm from "./EquityDataForm";

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

export default function EquityView() {
  const total = 12313;
  const [selectedComputation, setSelectedComputation] = useState(null);

  return (
    <div className="relative h-screen flex overflow-hidden bg-gray-100">
      <div className="flex-1 overflow-auto focus:outline-none">
        <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
          {/* <OverviewHeader total={total} /> */}
          <div className="mt-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* <h2 className="text-lg leading-6 font-medium text-gray-900">
                Portfolio Overview
              </h2> */}
              <OverviewHeader total={total} />
              <EquityInputType
                selected={selectedComputation}
                setSelected={setSelectedComputation}
              />
              <EquityDataForm type={selectedComputation?.type} />
            </div>

            {/* <Datatable /> */}
            {/* <Reports transactions={transactions} /> */}
          </div>
        </main>
      </div>
    </div>
  );
}
