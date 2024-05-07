"use client"
import React, { useEffect, useState } from 'react';
import { apiBase } from '@/api';
import Pagination from '@/components/shares/pagination/Pagination';
import { IKPI } from '@/types/kpi';

const Result: React.FC = () => {
  const [kpiData, setKPIData] = useState<IKPI[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchKPI(currentPage);
  }, [currentPage]);

  const fetchKPI = async (page: number) => {
    try {
      const limit = 5;
      const response = await apiBase().kpi().getKPI(page, limit);
      setKPIData(response.data.data);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.error('Error fetching KPI:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Daftar KPI</h1>
      {kpiData.map((kpiItem) => (
        <div key={kpiItem.kpi_id}>
          <p>Performance: {kpiItem.performance}</p>
          <ul>
            {kpiItem.kpiDetails.map((detail) => (
              <li key={detail.kpi_detail_id}>
                {detail.indicator}: {detail.realization} / {detail.target}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Result;
