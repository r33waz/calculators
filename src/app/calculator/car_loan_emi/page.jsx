"use client";
import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pie_Chart from "@/components/charts/pieChart";
import formatNumberInNepali from "@/utils/formattedNumber";
import { Button } from "@/components/ui/button";
import AmortizationTable from "@/utils/emiYearTabe";

function Car_loan_emi() {
  const [loanAmount, setLoanAmount] = useState(1000000); // Initial loan amount
  const [annualInterestRate, setAnnualInterestRate] = useState(8.5); // Annual interest rate
  const [loanTenure, setLoanTenure] = useState(1); // Loan tenure in years
  const [emi, setEMI] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [amortizationTable, setAmortizationTable] = useState([]); // Holds the EMI breakdown
  const [openList, setOpenlist] = useState(false);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const calculateCarEMI = () => {
    const principal = loanAmount;
    const monthlyRate = annualInterestRate / 12 / 100;
    const totalMonths = loanTenure * 12;

    // EMI calculation using the formula
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - principal;

    setEMI(emi.toFixed(0));
    setTotalPayment(totalPayment.toFixed(0));
    setTotalInterest(totalInterest.toFixed(0));

    // Generating the amortization table
    const table = AmortizationTable(principal, monthlyRate, totalMonths, emi);
    setAmortizationTable(table);
  };

  useEffect(() => {
    calculateCarEMI();
  }, [loanAmount, annualInterestRate, loanTenure]);
  const data = [
    { name: "Principal Amount", value: parseFloat(loanAmount) },
    { name: "Intrest Amount", value: parseFloat(emi) },
  ];

  const getSliderPercentage = (value, min, max) => {
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <>
      <div className="grid place-content-center w-full ">
        <div className="flex flex-col gap-4">
          <Breadcrumb className="mt-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Car Loan EMI Calculator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="md:text-4xl font-semibold">Car Loan EMI Calculator</h1>
          <div className="flex  justify-between md:w-[1000px] w-full md:flex-nowrap flex-wrap">
            <div className="flex flex-col w-full md:gap-8 gap-4 p-2">
              {/* Investment Amount */}
              <div className="mb-4 space-y-3">
                <label className="text-gray-700 flex w-full justify-between items-center">
                  <p className="md:text-lg text-[12px]">Loan Amount (Rs)</p>
                  <div className="text-sm bg-[#00C49F] px-1 py-1 rounded-md text-white tracking-wider font-medium w-32 text-right outline-none flex gap-0.5 items-center">
                    <span>Rs</span>
                    <input
                      className={`md:text-lg text-sm outline-none w-24 text-right ${
                        loanAmount < 0 ? "bg-red-500" : "bg-[#00C49F]"
                      }`}
                      value={loanAmount === 0 ? "" : loanAmount} // Allow clearing input
                      onChange={(e) => {
                        const value = e.target.value;
                        // Allow empty input
                        if (value === "") {
                          setLoanAmount(0);
                          return;
                        } else if (value > 100000000) {
                          setLoanAmount(100000000);
                        } else {
                          const parsedValue = parseFloat(value);
                          if (!isNaN(parsedValue)) {
                            setLoanAmount(parsedValue);
                          }
                        }
                      }}
                    />
                  </div>
                </label>
                <input
                  type="range"
                  min="100000"
                  max="100000000"
                  step="500"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full range-slider"
                  style={{
                    background: `linear-gradient(to right, #0088FE ${getSliderPercentage(
                      loanAmount,
                      100000,
                      100000000
                    )}%, #e2e8f0 ${getSliderPercentage(
                      loanAmount,
                      100000,
                      100000000
                    )}%)`,
                  }}
                />
              </div>
              <div className="mb-4 space-y-3">
                <label className="text-gray-700 flex w-full justify-between">
                  <p className="md:text-lg text-[12px]">
                    Rate of intrest (p.a)
                  </p>
                  <div className="text-sm bg-[#00C49F] px-2.5 py-1 rounded-md text-white tracking-wider font-medium w-32 text-right outline-none flex gap-0.5 items-center">
                    <input
                      className={`md:text-lg text-sm outline-none w-24 text-right ${
                        annualInterestRate < 0 ? "bg-red-500" : "bg-[#00C49F]"
                      }`}
                      value={annualInterestRate === 0 ? "" : annualInterestRate} // Allow clearing input
                      onChange={(e) => {
                        const value = e.target.value;

                        // Allow empty input
                        if (value === "") {
                          setAnnualInterestRate(0); // or set to a default value if needed
                          return;
                        }

                        const parsedValue = parseFloat(value);
                        if (!isNaN(parsedValue)) {
                          if (parsedValue < 1) {
                            setAnnualInterestRate(0);
                          } else if (parsedValue > 30) {
                            setAnnualInterestRate(30);
                          } else {
                            setAnnualInterestRate(parsedValue);
                          }
                        }
                      }}
                    />
                    <span>%</span>
                  </div>
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={annualInterestRate}
                  step="0.1"
                  onChange={(e) =>
                    setAnnualInterestRate(Number(e.target.value))
                  }
                  className="mt-1 w-full outline-none"
                  style={{
                    background: `linear-gradient(to right, #0088FE ${getSliderPercentage(
                      annualInterestRate,
                      1,
                      30
                    )}%, #e2e8f0 ${getSliderPercentage(
                      annualInterestRate,
                      1,
                      30
                    )}%)`,
                  }}
                />
              </div>
              <div className="mb-4 space-y-3">
                <label className="text-gray-700 flex w-full justify-between">
                  <p className="md:text-lg text-[12px]">Loan tenure</p>
                  <div className="text-sm bg-[#00C49F]  py-1 rounded-md text-white tracking-wider font-medium w-32 text-right outline-none flex gap-0.5 items-center">
                    <input
                      className={`md:text-lg text-sm outline-none w-24 text-right ${
                        loanTenure < 0 ? "bg-red-500" : "bg-[#00C49F]"
                      }`}
                      value={loanTenure === 0 ? "" : loanTenure} // Allow clearing input
                      onChange={(e) => {
                        const value = e.target.value;
                        // Allow empty input
                        if (value === "") {
                          setLoanTenure(0);
                          return;
                        } else if (value > 30) {
                          setLoanTenure(30);
                        } else {
                          const parsedValue = parseFloat(value);
                          if (!isNaN(parsedValue)) {
                            setLoanTenure(parsedValue);
                          }
                        }
                      }}
                    />
                    <span>Yrs</span>
                  </div>
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="mt-1 w-full outline-none"
                  style={{
                    background: `linear-gradient(to right, #0088FE ${getSliderPercentage(
                      loanTenure,
                      1,
                      30
                    )}%, #e2e8f0 ${getSliderPercentage(loanTenure, 1, 30)}%)`,
                  }}
                />
              </div>
              <div className="w-full bg-white">
                <h2 className="md:text-lg text-sm font-semibold">Results</h2>
                <div className="mt-1.5 md:text-lg text-sm flex flex-col gap-2">
                  <div className="flex w-full justify-between">
                    <p>Monthly EMI: Rs </p>
                    <p className="text-[#0088FE]">
                      {formatNumberInNepali(emi)}
                    </p>
                  </div>
                  <div className="flex w-full justify-between">
                    <p>Total Interest Payable: Rs </p>
                    <p className="text-[#00C49F]">
                      {formatNumberInNepali(totalInterest)}
                    </p>
                  </div>
                  <div className="flex w-full justify-between">
                    <p>Total Payment: Rs </p>
                    <p className="text-purple-700">
                      {formatNumberInNepali(totalPayment)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Pie_Chart data={data} COLORS={COLORS} cy={210} height={400} />
          </div>
        </div>
        <div className="p-2">
          <div className="flex flex-col">
            <h2 className="md:text-lg text-sm font-medium ">
              Your Amortization Details(Yearly/Monthly)
            </h2>
            <Button
              className="md:text-sm text-xs md:h-10 h-8 w-fit"
              onClick={() => setOpenlist(!openList)}
            >
              {openList ? "Hide Details ▲" : "Show Details ▼"}
            </Button>
          </div>
          {openList && Object.keys(amortizationTable).length > 0 && (
            <div>
              {Object.keys(amortizationTable).map((year) => (
                <div key={year} className="">
                  <Accordion type="single" collapsible className="">
                    <AccordionItem value={year}>
                      <AccordionTrigger className=" cursor-pointer font-semibold text-lg">
                        {year}
                      </AccordionTrigger>
                      <AccordionContent>
                        <Table className="bg-[#00C49F] bg-opacity-10 text-sm rounded-lg ">
                          <TableHeader>
                            <TableRow>
                              <TableHead className="">Month</TableHead>
                              <TableHead>Principal Paid</TableHead>
                              <TableHead className="">Interest Paid</TableHead>
                              <TableHead className="">
                                Remaining Balance
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {amortizationTable[year].map((row, index) => (
                              <TableRow key={index}>
                                <TableCell>{row.month}</TableCell>
                                <TableCell>Rs {row.principalPaid}</TableCell>
                                <TableCell className="">
                                  Rs {row.interestPaid}
                                </TableCell>
                                <TableCell className="">
                                  Rs {row.remainingBalance}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="max-w-4xl mt-4">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            What is Car Loan EMI (Equated Monthly Installment)?
          </h1>

          {/* EMI Explanation */}
          <section className="mb-8">
            <p className="text-sm md:text-base leading-6 text-gray-700">
              An <strong>Equated Monthly Installment (EMI)</strong> for a car
              loan is the fixed amount of money you pay each month towards
              repaying the loan taken to purchase a car. EMI consists of both
              the principal amount and the interest, allowing borrowers to own a
              vehicle without making a large upfront payment.
            </p>
          </section>

          {/* How Does EMI Work */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              How Does Car Loan EMI Work?
            </h2>
            <ol className="list-decimal list-inside space-y-4 text-sm md:text-base text-gray-700">
              <li>
                <strong>Loan Amount (Principal):</strong> The total amount
                borrowed from the lender to purchase the car.
              </li>
              <li>
                <strong>Interest Rate:</strong> The interest charged on the
                loan, typically expressed as an annual percentage rate (APR).
              </li>
              <li>
                <strong>Loan Tenure:</strong> The period over which the loan is
                repaid, usually ranging from 1 to 7 years.
              </li>
              <li>
                <strong>EMI Calculation:</strong> EMIs are calculated using a
                standard formula, ensuring the payment amount remains fixed
                throughout the tenure.
              </li>
              <li>
                <strong>Equal Payments:</strong> EMIs ensure that the borrower
                pays the same amount each month, combining both interest and
                principal repayment.
              </li>
            </ol>
          </section>

          {/* EMI Formula */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Car Loan EMI Formula: How Is EMI Calculated?
            </h2>
            <p className="text-sm md:text-base text-gray-700 mb-4">
              The EMI for a car loan can be calculated using the following
              formula:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg text-sm md:text-base">
              <code className="block overflow-x-auto">
                EMI = [P x r x (1 + r)^n] / [(1 + r)^n - 1]
              </code>
            </div>
            <p className="text-sm md:text-base text-gray-700 mt-4">Where:</p>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700">
              <li>
                <strong>P</strong> = Principal loan amount
              </li>
              <li>
                <strong>r</strong> = Monthly interest rate (annual interest rate
                divided by 12)
              </li>
              <li>
                <strong>n</strong> = Loan tenure (number of months)
              </li>
            </ul>
          </section>

          {/* Example */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Car Loan EMI Calculation Example
            </h2>
            <p className="text-sm md:text-base text-gray-700">
              Suppose you take a car loan of ₹10,00,000 at an annual interest
              rate of 9% for a tenure of 5 years (60 months). The EMI will be
              calculated as:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg text-sm md:text-base mt-4">
              <code>
                EMI = [10,00,000 x 0.0075 x (1 + 0.0075)^60] / [(1 + 0.0075)^60
                - 1]
              </code>
            </div>
            <p className="text-sm md:text-base text-gray-700 mt-4">
              After calculation, the EMI will be approximately ₹21,000 per
              month.
            </p>
          </section>

          {/* Benefits of EMI */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Benefits of Car Loan EMI
            </h2>
            <ul className="list-disc list-inside space-y-4 text-sm md:text-base text-gray-700">
              <li>
                <strong>Affordable Payments:</strong> EMIs make car financing
                affordable by spreading the cost over the loan tenure.
              </li>
              <li>
                <strong>Budget Management:</strong> Fixed monthly payments help
                in better financial planning and budgeting.
              </li>
              <li>
                <strong>Ownership:</strong> Owning a car becomes feasible
                without paying the entire amount upfront.
              </li>
              <li>
                <strong>Improved Credit Score:</strong> Regular EMI payments can
                enhance your credit score over time.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}

export default Car_loan_emi;