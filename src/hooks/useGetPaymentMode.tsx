import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { apiGetPaymentMethods } from "@/services/paymentSerive"; // Adjust the import path

type AddedBy = {
  id: number;
  firstName: string;
  secondName: string;
  lastName: string;
  email: string;
  phone: string;
  branch: {
    id: number;
    name: string;
    code: string;
    currency: {
      id: number;
      code: string;
      description: string;
    };
    country: {
      id: number;
      name: string;
      isoCode: string;
      countryCode: string;
    };
  };
};

type PaymentMethod = {
  id: number;
  method: string;
  description: string;
  addedBy: AddedBy;
  createdAt: string;
};

type ApiResponse = {
  status: number;
  message: string;
  data: PaymentMethod[];
};

type UsePaymentMethodsResult = {
  loading: boolean;
  error: string | null;
  options: { label: string; value: number }[];
  data: PaymentMethod[] | null;
  reloadPayment: () => void; // Reload function type
};

export const usePaymentMethods = (): UsePaymentMethodsResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PaymentMethod[] | null>(null);
  const [options, setOptions] = useState<{ label: string; value: number }[]>(
    [],
  );
  const [reloadFlag, setReloadFlag] = useState<boolean>(false); // Flag for reloading

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Replace with your API endpoint
      //   const response = await axios.get<ApiResponse>("/your-api-endpoint");
      const response = await apiGetPaymentMethods();

      const responseData = response.data;

      if (responseData.status === 200) {
        const transformedOptions = responseData.data.map((item) => ({
          label: item.method,
          value: item.id,
        }));
        setData(responseData.data);
        setOptions(transformedOptions);
      } else {
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  // Reload function to trigger data fetching
  const reloadPayment = () => {
    setReloadFlag((prev) => !prev); // Toggling the reloadFlag to trigger useEffect
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, reloadFlag]); // Refetch on component mount and when reloadFlag changes

  return {
    loading,
    error,
    options,
    data,
    reloadPayment, // Expose reload function
  };
};
