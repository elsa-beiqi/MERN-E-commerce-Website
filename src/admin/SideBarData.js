import React from 'react';
import { MdDashboard } from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import { HiUserAdd, HiReceiptRefund } from 'react-icons/hi';
import { BiCommentAdd } from 'react-icons/bi';

export const SidebarData = [
    // {
    //     type: '5',
    //     title: 'Dashboard',
    //     path: '/nopath',
    //     icon: <MdDashboard />,
    //     cName: 'side-text'
    // },
    {
        type: '4',
        title: 'Users',
        path: '/CreateUsers',
        icon: <HiUserAdd />,
        cName: 'side-text'
    },
    {
        type: '3',
        title: 'Stock',
        path: '/Stock',
        icon: <FaIcons.FaCartPlus />,
        cName: 'side-text'
    },
    {
        type: '3',
        title: 'Comments',
        path: '/ApproveComments',
        icon: <BiCommentAdd />,
        cName: 'side-text'
    },
    {
        type: '3',
        title: 'Invoice',
        path: '/ViewInvoice',
        icon: <FaIcons.FaFileInvoice />,
        cName: 'side-text',
    },
    {
        type: '3',
        title: 'Refunds',
        path: '/Refund',
        icon: < HiReceiptRefund />,
        cName: 'side-text'
    },
    {
        type: '2',
        title: 'Discounts',
        path: '/PriceDiscount',
        icon: <FaIcons.FaPercentage />,
        cName: 'side-text'
    },
    {
        type: '2',
        title: 'Invoices',
        path: '/InvoicesGivenRange',
        icon: <FaIcons.FaFileInvoiceDollar />,
        cName: 'side-text'
    },
];