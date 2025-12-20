// src/components/user/Babycare.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  LinearProgress,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
  Fab,
  AppBar,
  Toolbar,
  Breadcrumbs,
  Link
} from '@mui/material';

// Create custom SVG icons as React components
const DownloadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
  </svg>
);

const EditIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
);

const AddIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
  </svg>
);

const HospitalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.82L17.18 5 15 7.18 12.82 5 11 6.82 13.18 9 11 11.18 12.82 13 15 10.82 17.18 13 19 11.18 16.82 9zM1.99 19V5c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v14c0 1.1.9 2 2 2H4c-1.1 0-2-.9-2-2zm16-8h2v-2h-2v2zm0 4h2v-2h-2v2zm-8-4h2v-2h-2v2zm0 4h2v-2h-2v2zM5 19h2v-2H5v2zm0-4h2v-2H5v2zm0-4h2v-2H5v2z" />
  </svg>
);

const TimelineIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 8c0 1.1-.9 2-2 2-.18 0-.35-.02-.51-.07l-3.56 3.55c.05.16.07.34.07.52 0 1.1-.9 2-2 2s-2-.9-2-2c0-.18.02-.36.07-.52l-2.55-2.55c-.16.05-.34.07-.52.07s-.36-.02-.52-.07l-4.55 4.56c.05.16.07.33.07.51 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .35.02.51.07l4.56-4.55C8.02 9.36 8 9.18 8 9c0-1.1.9-2 2-2s2 .9 2 2c0 .18-.02.36-.07.52l2.55 2.55c.16-.05.34-.07.52-.07s.36.02.52.07l3.55-3.56C19.02 8.35 19 8.18 19 8c0-1.1.9-2 2-2s2 .9 2 2z" />
  </svg>
);

const AssessmentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
  </svg>
);

const VaccinesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 15h2v2h-2z" />
    <path d="M19 9h-4V3H9v6H5v2h2v10h10V11h2zM9 9h2V5h2v4h2V5h2v4h2v2H7V9z" />
  </svg>
);

const ChildCareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  </svg>
);

const NotificationsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </svg>
);

const PrintIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
  </svg>
);

const ShareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
  </svg>
);

const CloudUploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
  </svg>
);

const VisibilityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const WarningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
  </svg>
);

const InfoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

const ArrowBackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </svg>
);

// Add Folder Icon
const FolderIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
  </svg>
);

// Add File Icon
const FileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z" />
  </svg>
);

// Add Image Icon
const ImageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
  </svg>
);

// Add PDF Icon
const PdfIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z" />
  </svg>
);

// Add ExpandMore Icon
const ExpandMoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
  </svg>
);

// Appointment Icon
const AppointmentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

// Add Zip Icon
const ZipIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-2 6h-2v2h2v2h-2v2h-2v-2h2v-2h-2v-2h2v-2h-2V8h2v2h2v2z" />
  </svg>
);

// SVG Icons for Babycare
const BabyCareIcons = {
  Basic: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#4CAF50"/>
      <path d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15Z" fill="#4CAF50"/>
    </svg>
  ),
  Premium: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#2196F3"/>
    </svg>
  ),
  Deluxe: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z" fill="#9C27B0"/>
    </svg>
  ),
  Diaper: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM16 10H8C7.45 10 7 10.45 7 11V13C7 13.55 7.45 14 8 14H16C16.55 14 17 13.55 17 13V11C17 10.45 16.55 10 16 10Z" fill="#4CAF50"/>
    </svg>
  ),
  Bath: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 10H3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V10ZM7 12C7.55 12 8 11.55 8 11C8 10.45 7.55 10 7 10C6.45 10 6 10.45 6 11C6 11.55 6.45 12 7 12ZM5 6H19V8H5V6Z" fill="#2196F3"/>
    </svg>
  ),
  Feeding: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6ZM18 8C18 5.79 16.21 4 14 4C13.24 4 12.55 4.29 12 4.77C11.45 4.29 10.76 4 10 4C7.79 4 6 5.79 6 8C6 10.21 7.79 12 10 12C10.76 12 11.45 11.71 12 11.23C12.55 11.71 13.24 12 14 12C16.21 12 18 10.21 18 8Z" fill="#FF9800"/>
      <path d="M4 18V20H20V18C20 15.34 16.67 14 12 14C7.33 14 4 15.34 4 18Z" fill="#FF9800"/>
    </svg>
  ),
  Doctor: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 16V8C10 6.9 10.9 6 12 6H20C21.1 6 22 6.9 22 8V16C22 17.1 21.1 18 20 18H12C10.9 18 10 17.1 10 16ZM13 8H19C19.55 8 20 8.45 20 9V10H12V9C12 8.45 12.45 8 13 8ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5ZM4 6H8V8H4V12H8V14H4V18H8V20H4C2.9 20 2 19.1 2 18V8C2 6.9 2.9 6 4 6Z" fill="#9C27B0"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#4CAF50"/>
    </svg>
  ),
  Caregiver: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.5 12C17.88 12 18.99 10.88 18.99 9.5C18.99 8.12 17.88 7 16.5 7C15.12 7 14 8.12 14 9.5C14 10.88 15.12 12 16.5 12ZM9 11C10.66 11 11.99 9.66 11.99 8C11.99 6.34 10.66 5 9 5C7.34 5 6 6.34 6 8C6 9.66 7.34 11 9 11ZM16.5 14C14.67 14 11 14.92 11 16.75V19H22V16.75C22 14.92 18.33 14 16.5 14ZM9 13C6.67 13 2 14.17 2 16.5V19H9V16.75C9 15.9 9.33 14.41 11.37 13.28C10.5 13.1 9.66 13 9 13Z" fill="#FF5722"/>
    </svg>
  ),
  Play: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 16.5L6 13.5V10.5L10 7.5V16.5ZM14.5 12L10.5 15V9L14.5 12Z" fill="#E91E63"/>
    </svg>
  ),
  Sleep: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15.5 8C14.67 8 14 8.67 14 9.5C14 10.33 14.67 11 15.5 11C16.33 11 17 10.33 17 9.5C17 8.67 16.33 8 15.5 8ZM8.5 8C7.67 8 7 8.67 7 9.5C7 10.33 7.67 11 8.5 11C9.33 11 10 10.33 10 9.5C10 8.67 9.33 8 8.5 8ZM12 13.5C9.67 13.5 7.69 14.96 7.13 17H16.87C16.31 14.96 14.33 13.5 12 13.5Z" fill="#673AB7"/>
    </svg>
  ),
  Baby: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM16.5 11.5C15.67 11.5 15 10.83 15 10C15 9.17 15.67 8.5 16.5 8.5C17.33 8.5 18 9.17 18 10C18 10.83 17.33 11.5 16.5 11.5ZM7.5 11.5C6.67 11.5 6 10.83 6 10C6 9.17 6.67 8.5 7.5 8.5C8.33 8.5 9 9.17 9 10C9 10.83 8.33 11.5 7.5 11.5ZM12 17.5C9.67 17.5 7.69 16.04 7.13 14H16.87C16.31 16.04 14.33 17.5 12 17.5Z" fill="#00BCD4"/>
    </svg>
  )
};

// Razorpay script loader
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Babycare = ({ setActiveView, addNotification, colors, user }) => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [babyDetails, setBabyDetails] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    weight: '',
    height: '',
    allergies: '',
    specialNeeds: ''
  });
  const [parentDetails, setParentDetails] = useState({
    fatherName: user?.fullName?.split(' ')[0] || '',
    motherName: '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    emergencyContact: ''
  });
  const [caregiverPreferences, setCaregiverPreferences] = useState({
    preferredHours: '8',
    shiftPreference: 'day',
    specialRequirements: '',
    includeWeekends: false,
    includeHolidays: false
  });
  const [subscriptionDuration, setSubscriptionDuration] = useState('1');
  const [startDate, setStartDate] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [showPhoneConfirm, setShowPhoneConfirm] = useState(false);
  const [tempPhone, setTempPhone] = useState(user?.phone || '');
  const [phoneError, setPhoneError] = useState('');
  const [paymentPlan, setPaymentPlan] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [babyReports, setBabyReports] = useState([]);
  const [vaccinationSchedule, setVaccinationSchedule] = useState([]);
  const [growthMilestones, setGrowthMilestones] = useState([]);
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [newReport, setNewReport] = useState({
    type: 'checkup',
    date: '',
    doctorName: '',
    findings: '',
    weight: '',
    height: '',
    headCircumference: '',
    notes: '',
    file: null
  });

  // Folder State Management
  const [babyFolders, setBabyFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [folderItems, setFolderItems] = useState([]);
  const [openFolderDialog, setOpenFolderDialog] = useState(false);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [newFolder, setNewFolder] = useState({ name: '', description: '' });
  const [uploadFile, setUploadFile] = useState({
    name: '',
    type: 'document',
    file: null,
    description: ''
  });
  const [viewFileDialog, setViewFileDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Development Guidelines State
  const [developmentGuidelines, setDevelopmentGuidelines] = useState([]);
  const [completedMilestones, setCompletedMilestones] = useState([]);

  // Handle Book Appointments navigation
  const handleBookAppointments = () => {
    setActiveView('consultation');
  };

  // Initialize with sample data
  useEffect(() => {
    // Load sample reports
    const sampleReports = [
      {
        id: 1,
        type: 'vaccination',
        date: '2024-01-15',
        title: 'BCG Vaccine',
        doctor: 'Dr. Sharma',
        status: 'completed',
        description: 'BCG vaccination given'
      },
      {
        id: 2,
        type: 'checkup',
        date: '2024-01-20',
        title: 'Monthly Checkup',
        doctor: 'Dr. Patel',
        status: 'completed',
        description: 'Regular health checkup'
      },
      {
        id: 3,
        type: 'vaccination',
        date: '2024-02-15',
        title: 'Hepatitis B - Dose 2',
        doctor: 'Dr. Sharma',
        status: 'upcoming',
        description: 'Scheduled vaccination'
      }
    ];
    setBabyReports(sampleReports);

    // Load sample vaccination schedule
    const sampleVaccinations = [
      { id: 1, name: 'BCG', age: 'At Birth', dose: 'Single', status: 'completed', date: '2024-01-15' },
      { id: 2, name: 'Hepatitis B - 1', age: 'At Birth', dose: '1st', status: 'completed', date: '2024-01-15' },
      { id: 3, name: 'OPV - 0', age: 'At Birth', dose: '0', status: 'completed', date: '2024-01-15' },
      { id: 4, name: 'Hepatitis B - 2', age: '1 Month', dose: '2nd', status: 'upcoming', date: '2024-02-15' },
      { id: 5, name: 'OPV - 1', age: '6 Weeks', dose: '1st', status: 'pending', date: '2024-02-28' },
      { id: 6, name: 'Pentavalent - 1', age: '6 Weeks', dose: '1st', status: 'pending', date: '2024-02-28' },
      { id: 7, name: 'Rotavirus - 1', age: '6 Weeks', dose: '1st', status: 'pending', date: '2024-02-28' }
    ];
    setVaccinationSchedule(sampleVaccinations);

    // Load sample growth milestones
    const sampleMilestones = [
      { id: 1, age: '1 Month', milestone: 'Smiles spontaneously', status: 'achieved', date: '2024-01-30' },
      { id: 2, age: '2 Months', milestone: 'Holds head up', status: 'in-progress', date: '2024-02-15' },
      { id: 3, age: '3 Months', milestone: 'Reaches for objects', status: 'pending', date: '2024-03-15' },
      { id: 4, age: '4 Months', milestone: 'Rolls over', status: 'pending', date: '2024-04-15' },
      { id: 5, age: '6 Months', milestone: 'Sits without support', status: 'pending', date: '2024-06-15' }
    ];
    setGrowthMilestones(sampleMilestones);

    // Load sample folders
    const sampleFolders = [
      {
        id: 1,
        name: 'Vaccination Records',
        icon: '💉',
        color: '#4CAF50',
        description: 'All vaccination certificates and records',
        itemCount: 8,
        lastUpdated: '2024-02-15'
      },
      {
        id: 2,
        name: 'Medical Reports',
        icon: '📋',
        color: '#2196F3',
        description: 'Doctor visits, prescriptions, and medical reports',
        itemCount: 12,
        lastUpdated: '2024-02-10'
      },
      {
        id: 3,
        name: 'Growth Photos',
        icon: '📸',
        color: '#FF9800',
        description: 'Monthly growth photos and videos',
        itemCount: 24,
        lastUpdated: '2024-02-01'
      },
      {
        id: 4,
        name: 'Development Milestones',
        icon: '🎯',
        color: '#9C27B0',
        description: 'Videos and notes of developmental achievements',
        itemCount: 15,
        lastUpdated: '2024-01-30'
      },
      {
        id: 5,
        name: 'Prescriptions',
        icon: '💊',
        color: '#FF5722',
        description: 'All medicine prescriptions',
        itemCount: 6,
        lastUpdated: '2024-02-05'
      },
      {
        id: 6,
        name: 'Birth Documents',
        icon: '👶',
        color: '#00BCD4',
        description: 'Birth certificate and hospital documents',
        itemCount: 5,
        lastUpdated: '2024-01-10'
      }
    ];
    setBabyFolders(sampleFolders);

    // Load development guidelines
    const initialGuidelines = [
      {
        age: '0-3 Months',
        milestones: [
          'Turns head towards sounds',
          'Follows objects with eyes',
          'Smiles spontaneously',
          'Coos and makes gurgling sounds'
        ],
        healthChecks: ['Weight gain monitoring', 'Reflex assessment', 'Hearing test'],
        planCoverage: ['All Plans', 'Premium+', 'Deluxe Only'],
        completed: false
      },
      {
        age: '4-6 Months',
        milestones: [
          'Rolls over in both directions',
          'Sits with support',
          'Laughs and squeals',
          'Reaches for objects'
        ],
        healthChecks: ['Vision screening', 'Head circumference', 'Muscle tone assessment'],
        planCoverage: ['All Plans', 'Premium+', 'Deluxe Only'],
        completed: false
      },
      {
        age: '7-9 Months',
        milestones: [
          'Crawls on hands and knees',
          'Pulls to stand',
          'Uses pincer grasp',
          'Understands "no"'
        ],
        healthChecks: ['Solid food introduction', 'Teething check', 'Social development'],
        planCoverage: ['Premium+', 'Deluxe Only', 'Deluxe Only'],
        completed: false
      },
      {
        age: '10-12 Months',
        milestones: [
          'Walks holding furniture',
          'Says "mama" and "dada"',
          'Points at objects',
          'Follows simple commands'
        ],
        healthChecks: ['First birthday checkup', 'Language assessment', 'Mobility evaluation'],
        planCoverage: ['Premium+', 'Deluxe Only', 'Deluxe Only'],
        completed: false
      },
      {
        age: '1-2 Years',
        milestones: [
          'Walks independently',
          'Speaks 20+ words',
          'Climbs stairs with help',
          'Uses spoon'
        ],
        healthChecks: ['Annual checkup', 'Speech development', 'Social skills'],
        planCoverage: ['Premium+', 'Deluxe Only', 'Deluxe Only'],
        completed: false
      },
      {
        age: '2-3 Years',
        milestones: [
          'Runs and jumps',
          'Speaks in sentences',
          'Recognizes colors',
          'Toilet training'
        ],
        healthChecks: ['Dental checkup', 'Vision and hearing', 'Behavioral assessment'],
        planCoverage: ['Premium+', 'Deluxe Only', 'Deluxe Only'],
        completed: false
      },
      {
        age: '3-5 Years',
        milestones: [
          'Rides tricycle',
          'Counts to 10',
          'Dresses self',
          'Plays cooperatively'
        ],
        healthChecks: ['Preschool readiness', 'Fine motor skills', 'Cognitive assessment'],
        planCoverage: ['Premium+', 'Deluxe Only', 'Deluxe Only'],
        completed: false
      }
    ];
    setDevelopmentGuidelines(initialGuidelines);

    // Load sample folder items for first folder
    if (sampleFolders.length > 0) {
      setCurrentFolder(sampleFolders[0]);
      loadFolderItems(sampleFolders[0].id);
    }
  }, []);

  // Load folder items
  const loadFolderItems = (folderId) => {
    // Mock data for folder items
    const folderItemsData = {
      1: [
        { id: 1, name: 'BCG Certificate.pdf', type: 'pdf', size: '2.4 MB', date: '2024-01-15', url: '#', icon: <PdfIcon /> },
        { id: 2, name: 'Hepatitis B Record.pdf', type: 'pdf', size: '1.8 MB', date: '2024-01-15', url: '#', icon: <PdfIcon /> },
        { id: 3, name: 'Vaccination Schedule.xlsx', type: 'excel', size: '1.2 MB', date: '2024-01-20', url: '#', icon: <FileIcon /> },
        { id: 4, name: 'Vaccine Side Effects Notes.txt', type: 'text', size: '45 KB', date: '2024-01-18', url: '#', icon: <FileIcon /> }
      ],
      2: [
        { id: 5, name: 'Monthly Checkup Report.pdf', type: 'pdf', size: '3.2 MB', date: '2024-02-10', url: '#', icon: <PdfIcon /> },
        { id: 6, name: 'Blood Test Results.pdf', type: 'pdf', size: '2.1 MB', date: '2024-01-25', url: '#', icon: <PdfIcon /> },
        { id: 7, name: 'Doctor Prescription.jpg', type: 'image', size: '1.5 MB', date: '2024-02-05', url: '#', icon: <ImageIcon /> }
      ],
      3: [
        { id: 8, name: 'Month 1 Photo.jpg', type: 'image', size: '4.2 MB', date: '2024-01-10', url: '#', icon: <ImageIcon /> },
        { id: 9, name: 'Month 2 Photo.jpg', type: 'image', size: '4.5 MB', date: '2024-02-10', url: '#', icon: <ImageIcon /> },
        { id: 10, name: 'First Smile Video.mp4', type: 'video', size: '15.8 MB', date: '2024-01-20', url: '#', icon: <FileIcon /> }
      ]
    };

    setFolderItems(folderItemsData[folderId] || []);
  };

  // Handle folder click
  const handleFolderClick = (folder) => {
    setCurrentFolder(folder);
    loadFolderItems(folder.id);
  };

  // Handle create new folder
  const handleCreateFolder = () => {
    if (!newFolder.name.trim()) {
      setSnackbar({
        open: true,
        message: 'Folder name is required',
        severity: 'error'
      });
      return;
    }

    const folder = {
      id: Date.now(),
      name: newFolder.name,
      icon: '📁',
      color: '#607D8B',
      description: newFolder.description,
      itemCount: 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setBabyFolders([...babyFolders, folder]);
    setNewFolder({ name: '', description: '' });
    setOpenFolderDialog(false);

    setSnackbar({
      open: true,
      message: 'Folder created successfully!',
      severity: 'success'
    });
  };

  // Handle file upload
  const handleFileUpload = () => {
    if (!uploadFile.name.trim() || !uploadFile.file) {
      setSnackbar({
        open: true,
        message: 'File name and file are required',
        severity: 'error'
      });
      return;
    }

    if (!currentFolder) {
      setSnackbar({
        open: true,
        message: 'Please select a folder first',
        severity: 'error'
      });
      return;
    }

    const fileItem = {
      id: Date.now(),
      name: uploadFile.name,
      type: uploadFile.type,
      size: `${(uploadFile.file.size / (1024 * 1024)).toFixed(2)} MB`,
      date: new Date().toISOString().split('T')[0],
      description: uploadFile.description,
      url: URL.createObjectURL(uploadFile.file),
      icon: getFileIcon(uploadFile.type)
    };

    setFolderItems([...folderItems, fileItem]);

    // Update folder item count
    setBabyFolders(babyFolders.map(folder => 
      folder.id === currentFolder.id 
        ? { ...folder, itemCount: folder.itemCount + 1, lastUpdated: new Date().toISOString().split('T')[0] }
        : folder
    ));

    setUploadFile({ name: '', type: 'document', file: null, description: '' });
    setOpenUploadDialog(false);

    setSnackbar({
      open: true,
      message: 'File uploaded successfully!',
      severity: 'success'
    });
  };

  // Get file icon based on type
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf': return <PdfIcon />;
      case 'image': return <ImageIcon />;
      case 'video': return <FileIcon />;
      case 'document': return <FileIcon />;
      case 'excel': return <FileIcon />;
      case 'zip': return <ZipIcon />;
      default: return <FileIcon />;
    }
  };

  // Handle file download
  const handleFileDownload = (file) => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle file view
  const handleFileView = (file) => {
    setSelectedFile(file);
    setViewFileDialog(true);
  };

  // Handle file delete
  const handleFileDelete = (fileId) => {
    setFolderItems(folderItems.filter(item => item.id !== fileId));
    
    // Update folder item count
    if (currentFolder) {
      setBabyFolders(babyFolders.map(folder => 
        folder.id === currentFolder.id 
          ? { ...folder, itemCount: folder.itemCount - 1 }
          : folder
      ));
    }

    setSnackbar({
      open: true,
      message: 'File deleted successfully',
      severity: 'success'
    });
  };

  // Handle folder delete
  const handleFolderDelete = (folderId) => {
    setBabyFolders(babyFolders.filter(folder => folder.id !== folderId));
    
    if (currentFolder && currentFolder.id === folderId) {
      setCurrentFolder(null);
      setFolderItems([]);
    }

    setSnackbar({
      open: true,
      message: 'Folder deleted successfully',
      severity: 'success'
    });
  };

  // Render Folder Tab
  const renderFolderTab = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ color: colors.primary, fontWeight: 'bold' }}>
          📁 Baby Documents & Files
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setOpenFolderDialog(true)}
            sx={{ color: colors.primary, borderColor: colors.primary }}
          >
            New Folder
          </Button>
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onClick={() => setOpenUploadDialog(true)}
            sx={{ bgcolor: colors.primary }}
            disabled={!currentFolder}
          >
            Upload File
          </Button>
        </Box>
      </Box>

      {/* Breadcrumb Navigation */}
      <Paper sx={{ p: 2, mb: 3, bgcolor: colors.softbg }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            onClick={() => setCurrentFolder(null)}
            sx={{ cursor: 'pointer' }}
          >
            All Folders
          </Link>
          {currentFolder && (
            <Typography color="text.primary">{currentFolder.name}</Typography>
          )}
        </Breadcrumbs>
      </Paper>

      <Grid container spacing={3}>
        {/* Folders List */}
        <Grid item xs={12} md={currentFolder ? 4 : 12}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: colors.primary }}>
                Folders ({babyFolders.length})
              </Typography>
              <List>
                {babyFolders.map((folder) => (
                  <ListItem
                    key={folder.id}
                    sx={{
                      mb: 1,
                      borderRadius: 1,
                      bgcolor: currentFolder?.id === folder.id ? `${colors.primary}10` : 'transparent',
                      borderLeft: currentFolder?.id === folder.id ? `4px solid ${folder.color}` : 'none',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: `${colors.primary}05`
                      }
                    }}
                    onClick={() => handleFolderClick(folder)}
                  >
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: `${folder.color}20`, color: folder.color }}>
                        {folder.icon}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography fontWeight="medium">{folder.name}</Typography>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFolderDelete(folder.id);
                            }}
                            sx={{ color: colors.softtext }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            {folder.description}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                            <Typography variant="caption">
                              {folder.itemCount} items
                            </Typography>
                            <Typography variant="caption">
                              Updated: {folder.lastUpdated}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Folder Content */}
        {currentFolder && (
          <Grid item xs={12} md={8}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: `${currentFolder.color}20`, color: currentFolder.color, width: 40, height: 40 }}>
                      {currentFolder.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 'bold' }}>
                        {currentFolder.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {currentFolder.description}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip 
                    label={`${folderItems.length} files`}
                    color="primary"
                    variant="outlined"
                  />
                </Box>

                {folderItems.length > 0 ? (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Size</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {folderItems.map((file) => (
                          <TableRow key={file.id} hover>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ color: colors.primary }}>
                                  {file.icon}
                                </Box>
                                <Box>
                                  <Typography variant="body2" fontWeight="medium">
                                    {file.name}
                                  </Typography>
                                  {file.description && (
                                    <Typography variant="caption" color="text.secondary">
                                      {file.description}
                                    </Typography>
                                  )}
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={file.type}
                                size="small"
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {file.size}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {file.date}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Tooltip title="View">
                                  <IconButton
                                    size="small"
                                    onClick={() => handleFileView(file)}
                                    sx={{ color: colors.primary }}
                                  >
                                    <VisibilityIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Download">
                                  <IconButton
                                    size="small"
                                    onClick={() => handleFileDownload(file)}
                                    sx={{ color: colors.primary }}
                                  >
                                    <DownloadIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                  <IconButton
                                    size="small"
                                    onClick={() => handleFileDelete(file.id)}
                                    sx={{ color: '#f44336' }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <FolderIcon sx={{ fontSize: 64, color: colors.softtext, mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No files in this folder
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Upload files to organize baby's documents and records
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      onClick={() => setOpenUploadDialog(true)}
                      sx={{ bgcolor: colors.primary }}
                    >
                      Upload First File
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );

  // Subscription plans data
  const subscriptionPlans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 4999,
      duration: 'month',
      features: [
        { icon: <BabyCareIcons.Diaper />, text: 'Monthly delivery of diapers, wipes & skincare' },
        { icon: <BabyCareIcons.Bath />, text: 'Baby bathing & hygiene essentials' },
        { icon: <BabyCareIcons.Caregiver />, text: 'Up to 8 hours/day babysitter support' },
        { icon: <BabyCareIcons.Feeding />, text: 'Basic feeding & diaper change assistance' },
        { icon: '📞', text: 'Monthly check-in & advice line' },
        { icon: '🧼', text: 'Nursery cleaning instructions' },
        { icon: '📊', text: 'Monthly growth tracking reports' },
        { icon: '💉', text: 'Vaccination reminders' }
      ],
      icon: <BabyCareIcons.Basic />,
      color: '#4CAF50',
      description: 'For parents who primarily want help with essentials and occasional babysitter support'
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 8999,
      duration: 'month',
      features: [
        { icon: '✅', text: 'Everything in Basic, plus:' },
        { icon: '⏰', text: 'Extended caregiver hours (12 hours/day)' },
        { icon: '✨', text: 'Enhanced hygiene & regular bathing' },
        { icon: <BabyCareIcons.Play />, text: 'Play & developmental support' },
        { icon: <BabyCareIcons.Sleep />, text: 'Sleep & routine establishment' },
        { icon: '📊', text: 'Weekly progress reports & analytics' },
        { icon: '🧸', text: 'Age-appropriate toys & activities' },
        { icon: '🏥', text: 'Monthly doctor consultations' },
        { icon: '📱', text: 'Mobile app with real-time updates' },
        { icon: '📈', text: 'Growth milestone tracking' }
      ],
      icon: <BabyCareIcons.Premium />,
      color: '#2196F3',
      description: 'For parents who want consistent care with developmental support'
    },
    {
      id: 'deluxe',
      name: 'Deluxe Plan',
      price: 14999,
      duration: 'month',
      features: [
        { icon: '✅', text: 'Everything in Premium, plus:' },
        { icon: '🏠', text: '24×7 live-in caregiver/nanny' },
        { icon: <BabyCareIcons.Doctor />, text: 'Medical/health monitoring support' },
        { icon: '👨‍⚕️', text: 'Expert pediatrician consultations (weekly)' },
        { icon: '🤱', text: 'Postnatal & mother support' },
        { icon: '🌿', text: 'Premium organic supplies' },
        { icon: '🔄', text: 'Flexible long-term care guarantee' },
        { icon: '🚨', text: 'Emergency replacement guarantee' },
        { icon: '📋', text: 'Comprehensive health assessment' },
        { icon: '💊', text: 'Medicine management system' },
        { icon: '🎯', text: 'Personalized development plan' },
        { icon: '📲', text: '24/7 video monitoring access' }
      ],
      icon: <BabyCareIcons.Deluxe />,
      color: '#9C27B0',
      description: 'Complete round-the-clock care with expert guidance'
    }
  ];

  // Baby care operations data
  const babyCareOperations = [
    {
      category: 'Daily Care',
      icon: '📅',
      color: '#4CAF50',
      operations: [
        { name: 'Feeding Schedule Management', icon: '🍼', description: 'Regular feeding times and tracking' },
        { name: 'Diaper Changes', icon: '👶', description: 'Regular diaper changes and hygiene maintenance' },
        { name: 'Bathing & Grooming', icon: '🛁', description: 'Daily baths, nail trimming, hair care' },
        { name: 'Sleep Monitoring', icon: '😴', description: 'Sleep pattern tracking and nap schedules' }
      ]
    },
    {
      category: 'Health & Hygiene',
      icon: '🏥',
      color: '#2196F3',
      operations: [
        { name: 'Temperature Monitoring', icon: '🌡️', description: 'Regular temperature checks' },
        { name: 'Vaccination Management', icon: '💉', description: 'Vaccination schedule tracking and reminders' },
        { name: 'Medicine Administration', icon: '💊', description: 'Medicine reminders and tracking' },
        { name: 'Nursery Sanitization', icon: '🧼', description: 'Regular cleaning and disinfection' }
      ]
    },
    {
      category: 'Development & Growth',
      icon: '📈',
      color: '#FF9800',
      operations: [
        { name: 'Play Time Activities', icon: '🎮', description: 'Age-appropriate play and stimulation' },
        { name: 'Milestone Tracking', icon: '📊', description: 'Growth and development milestones' },
        { name: 'Cognitive Exercises', icon: '🧠', description: 'Brain development activities' },
        { name: 'Motor Skills Development', icon: '🏃', description: 'Physical activity and movement' }
      ]
    },
    {
      category: 'Support Services',
      icon: '🛟',
      color: '#9C27B0',
      operations: [
        { name: '24/7 Caregiver Support', icon: '📞', description: 'Round-the-clock assistance' },
        { name: 'Expert Consultations', icon: '👨‍⚕️', description: 'Pediatrician and specialist access' },
        { name: 'Parent Education', icon: '📚', description: 'Caregiving workshops and training' },
        { name: 'Emergency Response', icon: '🚨', description: 'Emergency protocol and response' }
      ]
    }
  ];

  // Age-based development guidelines (0-5 years)
  const defaultDevelopmentGuidelines = [
    {
      age: '0-3 Months',
      milestones: [
        'Turns head towards sounds',
        'Follows objects with eyes',
        'Smiles spontaneously',
        'Coos and makes gurgling sounds'
      ],
      healthChecks: ['Weight gain monitoring', 'Reflex assessment', 'Hearing test'],
      planCoverage: ['All Plans', 'Premium+', 'Deluxe Only'],
      completed: false
    },
    {
      age: '4-6 Months',
      milestones: [
        'Rolls over in both directions',
        'Sits with support',
        'Laughs and squeals',
        'Reaches for objects'
      ],
      healthChecks: ['Vision screening', 'Head circumference', 'Muscle tone assessment'],
      planCoverage: ['All Plans', 'Premium+', 'Deluxe Only'],
      completed: false
    },
    {
      age: '7-9 Months',
      milestones: [
        'Crawls on hands and knees',
        'Pulls to stand',
        'Uses pincer grasp',
        'Understands "no"'
      ],
      healthChecks: ['Solid food introduction', 'Teething check', 'Social development'],
      planCoverage: ['Premium+', 'Deluxe Only', 'Deluxe Only'],
      completed: false
    },
    {
      age: '10-12 Months',
      milestones: [
        'Walks holding furniture',
        'Says "mama" and "dada"',
        'Points at objects',
        'Follows simple commands'
      ],
      healthChecks: ['First birthday checkup', 'Language assessment', 'Mobility evaluation'],
      planCoverage: ['Premium+', 'Deluxe Only', 'Deluxe Only'],
      completed: false
    },
    {
      age: '1-2 Years',
      milestones: [
        'Walks independently',
        'Speaks 20+ words',
        'Climbs stairs with help',
        'Uses spoon'
      ],
      healthChecks: ['Annual checkup', 'Speech development', 'Social skills'],
      planCoverage: ['Premium+', 'Deluxe Only', 'Deluxe Only'],
      completed: false
    },
    {
      age: '2-3 Years',
      milestones: [
        'Runs and jumps',
        'Speaks in sentences',
        'Recognizes colors',
        'Toilet training'
      ],
      healthChecks: ['Dental checkup', 'Vision and hearing', 'Behavioral assessment'],
      planCoverage: ['Premium+', 'Deluxe Only', 'Deluxe Only'],
      completed: false
    },
    {
      age: '3-5 Years',
      milestones: [
        'Rides tricycle',
        'Counts to 10',
        'Dresses self',
        'Plays cooperatively'
      ],
      healthChecks: ['Preschool readiness', 'Fine motor skills', 'Cognitive assessment'],
      planCoverage: ['Premium+', 'Deluxe Only', 'Deluxe Only'],
      completed: false
    }
  ];

  // Steps for the subscription process
  const steps = ['Select Plan', 'Baby Details', 'Parent Details', 'Caregiver Preferences', 'Payment'];

  // Initialize Razorpay
  useEffect(() => {
    const initializeRazorpay = async () => {
      const isLoaded = await loadRazorpayScript();
      setRazorpayLoaded(isLoaded);
      if (!isLoaded) {
        setSnackbar({
          open: true,
          message: 'Failed to load payment system. Please refresh the page.',
          severity: 'error'
        });
      }
    };
    initializeRazorpay();
  }, []);

  // Handle plan selection
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setActiveStep(1);
  };

  // Handle input changes
  const handleBabyDetailsChange = (e) => {
    setBabyDetails({
      ...babyDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleParentDetailsChange = (e) => {
    setParentDetails({
      ...parentDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleCaregiverPreferencesChange = (e) => {
    const { name, value, checked, type } = e.target;
    setCaregiverPreferences({
      ...caregiverPreferences,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Validate current step
  const validateStep = (step) => {
    switch (step) {
      case 0:
        return selectedPlan !== null;
      case 1:
        return babyDetails.name && babyDetails.dateOfBirth && babyDetails.gender;
      case 2:
        return parentDetails.email && parentDetails.phone && parentDetails.emergencyContact;
      case 3:
        return caregiverPreferences.preferredHours && caregiverPreferences.shiftPreference;
      default:
        return true;
    }
  };

  // Phone validation
  const validatePhoneNumber = (phone) => {
    if (phone.length !== 10) {
      return 'Phone number must be exactly 10 digits';
    }
    const validStartDigits = ['6', '7', '8', '9'];
    if (!validStartDigits.includes(phone.charAt(0))) {
      return 'Phone number must start with 6, 7, 8, or 9';
    }
    if (!/^\d+$/.test(phone)) {
      return 'Phone number must contain only digits';
    }
    return '';
  };

  // Handle phone input
  const handlePhoneInput = (value) => {
    const digitsOnly = value.replace(/\D/g, '');
    const limitedDigits = digitsOnly.slice(0, 10);
    setTempPhone(limitedDigits);
    
    if (limitedDigits.length > 0) {
      const error = validatePhoneNumber(limitedDigits);
      setPhoneError(error);
    } else {
      setPhoneError('');
    }
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep(activeStep)) {
      if (activeStep === steps.length - 2) {
        showPhoneConfirmation();
      } else {
        setActiveStep((prevStep) => prevStep + 1);
      }
    } else {
      setSnackbar({
        open: true,
        message: 'Please fill all required fields',
        severity: 'error'
      });
    }
  };

  // Handle back step
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Show phone confirmation
  const showPhoneConfirmation = () => {
    setPaymentPlan(selectedPlan);
    setTempPhone(parentDetails.phone || user?.phone || '');
    setPhoneError('');
    setShowPhoneConfirm(true);
  };

  // Initialize Razorpay payment
  const initiatePayment = async () => {
    setLoading(true);
    setShowPhoneConfirm(false);
    
    try {
      if (!razorpayLoaded) {
        throw new Error('Payment service is not available');
      }

      const options = {
        key: 'rzp_test_1DP5mmOlF5G5ag',
        amount: selectedPlan.price * 100 * parseInt(subscriptionDuration),
        currency: 'INR',
        name: 'QuickMed Baby Care',
        description: `${selectedPlan.name} - ${subscriptionDuration} month(s)`,
        handler: async function (response) {
          try {
            await verifyPayment(response);
            setPaymentSuccess(true);
            setOpenDialog(true);
            setSnackbar({
              open: true,
              message: 'Payment successful! Subscription activated.',
              severity: 'success'
            });
            
            // Save subscription
            saveSubscription();
            
            // Add notification
            addNotification(
              'Baby Care Subscription Activated',
              `Your ${selectedPlan.name} has been activated for ${babyDetails.name}`,
              'success'
            );
          } catch (error) {
            setSnackbar({
              open: true,
              message: 'Payment verification failed',
              severity: 'error'
            });
          }
        },
        prefill: {
          name: parentDetails.fatherName || parentDetails.motherName || user?.fullName,
          email: parentDetails.email,
          contact: tempPhone
        },
        notes: {
          babyName: babyDetails.name,
          subscriptionPlan: selectedPlan.name,
          duration: subscriptionDuration
        },
        theme: {
          color: selectedPlan.color
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setSnackbar({
              open: true,
              message: 'Payment was cancelled',
              severity: 'info'
            });
          }
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Payment initialization failed',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Verify payment (simulated)
  const verifyPayment = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 2000);
    });
  };

  // Save subscription to localStorage
  const saveSubscription = () => {
    const subscriptionData = {
      id: `babycare-${Date.now()}`,
      plan: selectedPlan,
      babyDetails,
      parentDetails,
      caregiverPreferences,
      subscriptionDuration,
      startDate: startDate || new Date().toISOString().split('T')[0],
      status: 'active',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + (parseInt(subscriptionDuration) * 30 * 24 * 60 * 60 * 1000)).toISOString()
    };

    const existingSubscriptions = JSON.parse(localStorage.getItem('babycareSubscriptions') || '[]');
    existingSubscriptions.push(subscriptionData);
    localStorage.setItem('babycareSubscriptions', JSON.stringify(existingSubscriptions));
    
    // Update development guidelines based on subscription plan
    updateDevelopmentGuidelines();
  };

  // Update development guidelines based on plan
  const updateDevelopmentGuidelines = () => {
    const updatedGuidelines = defaultDevelopmentGuidelines.map(guideline => {
      // Mark as covered based on plan
      const isCovered = checkPlanCoverage(guideline.planCoverage);
      return {
        ...guideline,
        isCovered,
        isActive: true
      };
    });
    setDevelopmentGuidelines(updatedGuidelines);
  };

  // Check if guideline is covered by current plan
  const checkPlanCoverage = (planCoverage) => {
    if (!selectedPlan) return false;
    
    const planLevel = selectedPlan.id === 'deluxe' ? 2 : selectedPlan.id === 'premium' ? 1 : 0;
    return planCoverage.some(coverage => {
      if (coverage === 'All Plans') return true;
      if (coverage === 'Premium+' && planLevel >= 1) return true;
      if (coverage === 'Deluxe Only' && planLevel >= 2) return true;
      return false;
    });
  };

  // Handle subscription start
  const handleStartSubscription = () => {
    setOpenDialog(false);
    setActiveTab(1); // Switch to Baby Profile tab
  };

  // Reset form
  const resetForm = () => {
    setSelectedPlan(null);
    setActiveStep(0);
    setBabyDetails({
      name: '',
      dateOfBirth: '',
      gender: '',
      bloodGroup: '',
      weight: '',
      height: '',
      allergies: '',
      specialNeeds: ''
    });
    setParentDetails({
      fatherName: user?.fullName?.split(' ')[0] || '',
      motherName: '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: '',
      emergencyContact: ''
    });
    setCaregiverPreferences({
      preferredHours: '8',
      shiftPreference: 'day',
      specialRequirements: '',
      includeWeekends: false,
      includeHolidays: false
    });
    setSubscriptionDuration('1');
    setStartDate('');
  };

  // Baby Reports Functions
  const handleAddReport = () => {
    setNewReport({
      type: 'checkup',
      date: new Date().toISOString().split('T')[0],
      doctorName: '',
      findings: '',
      weight: '',
      height: '',
      headCircumference: '',
      notes: '',
      file: null
    });
    setOpenReportDialog(true);
  };

  const handleSaveReport = () => {
    const report = {
      id: Date.now(),
      ...newReport,
      babyName: babyDetails.name,
      createdAt: new Date().toISOString()
    };
    
    setBabyReports([report, ...babyReports]);
    setOpenReportDialog(false);
    
    setSnackbar({
      open: true,
      message: 'Report added successfully!',
      severity: 'success'
    });
  };

  const handleDownloadReport = (report) => {
    // Simulate download
    const content = `
Baby Care Report
----------------
Baby Name: ${babyDetails.name}
Date: ${report.date}
Type: ${report.type}
Doctor: ${report.doctorName}
Findings: ${report.findings}
Weight: ${report.weight} kg
Height: ${report.height} cm
Head Circumference: ${report.headCircumference} cm
Notes: ${report.notes}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `baby-report-${report.date}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Vaccination Functions
  const handleMarkVaccination = (id, status) => {
    setVaccinationSchedule(prev => 
      prev.map(vaccine => 
        vaccine.id === id ? { ...vaccine, status, date: status === 'completed' ? new Date().toISOString().split('T')[0] : vaccine.date } : vaccine
      )
    );
    
    setSnackbar({
      open: true,
      message: `Vaccination marked as ${status}`,
      severity: 'success'
    });
  };

  const handleAddVaccination = () => {
    const newVaccine = {
      id: Date.now(),
      name: 'New Vaccine',
      age: 'Custom Age',
      dose: 'Single',
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    };
    
    setVaccinationSchedule([...vaccinationSchedule, newVaccine]);
  };

  // Growth Milestone Functions
  const handleUpdateMilestone = (id, status) => {
    setGrowthMilestones(prev =>
      prev.map(milestone =>
        milestone.id === id ? { ...milestone, status, date: status === 'achieved' ? new Date().toISOString().split('T')[0] : milestone.date } : milestone
      )
    );
  };

  // Handle milestone completion for development guidelines
  const handleCompleteMilestone = (ageGroup, milestoneIndex) => {
    const updatedGuidelines = developmentGuidelines.map(guideline => {
      if (guideline.age === ageGroup) {
        const newCompletedMilestones = [...(guideline.completedMilestones || [])];
        if (!newCompletedMilestones.includes(milestoneIndex)) {
          newCompletedMilestones.push(milestoneIndex);
        }
        return {
          ...guideline,
          completedMilestones: newCompletedMilestones,
          completionPercentage: Math.round((newCompletedMilestones.length / guideline.milestones.length) * 100)
        };
      }
      return guideline;
    });
    setDevelopmentGuidelines(updatedGuidelines);
    
    setSnackbar({
      open: true,
      message: 'Milestone marked as completed!',
      severity: 'success'
    });
  };

  // Render Development Guidelines Tab
  const renderDevelopmentGuidelinesTab = () => {
    const isSubscriptionActive = selectedPlan && babyDetails.name;
    
    return (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ color: colors.primary, fontWeight: 'bold' }}>
            📋 Development Guidelines (0-5 Years)
          </Typography>
          {!isSubscriptionActive && (
            <Button
              variant="outlined"
              onClick={() => setActiveTab(0)}
              sx={{ color: colors.primary }}
            >
              Subscribe to Access
            </Button>
          )}
        </Box>

        {isSubscriptionActive ? (
          <>
            <Paper sx={{ p: 3, mb: 4, bgcolor: colors.softbg }}>
              <Typography variant="h6" gutterBottom sx={{ color: colors.primary }}>
                Development Progress for {babyDetails.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Track your baby's developmental milestones based on age. Green checkmarks indicate completed milestones.
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Chip 
                  label={`Plan: ${selectedPlan.name}`}
                  color="primary"
                  variant="outlined"
                />
                <Chip 
                  label={`Age: ${calculateBabyAge(babyDetails.dateOfBirth)}`}
                  color="secondary"
                  variant="outlined"
                />
              </Box>
            </Paper>

            <Grid container spacing={3}>
              {developmentGuidelines.map((guideline, index) => {
                const isCovered = checkPlanCoverage(guideline.planCoverage);
                const completionPercentage = guideline.completionPercentage || 0;
                const completedCount = guideline.completedMilestones?.length || 0;
                const totalCount = guideline.milestones.length;
                
                return (
                  <Grid item xs={12} md={6} key={index}>
                    <Card sx={{ 
                      height: '100%', 
                      borderLeft: `4px solid ${isCovered ? colors.primary : colors.softtext}`,
                      opacity: isCovered ? 1 : 0.7
                    }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h6" sx={{ color: isCovered ? colors.primary : colors.softtext, fontWeight: 'bold' }}>
                            {guideline.age}
                          </Typography>
                          <Chip 
                            label={isCovered ? 'Covered' : 'Not Covered'} 
                            size="small" 
                            color={isCovered ? 'success' : 'default'}
                            variant="outlined"
                          />
                        </Box>
                        
                        {/* Progress Bar */}
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2">
                              Progress: {completedCount}/{totalCount} milestones
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {completionPercentage}%
                            </Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={completionPercentage} 
                            sx={{ 
                              height: 8, 
                              borderRadius: 4,
                              bgcolor: colors.softbg,
                              '& .MuiLinearProgress-bar': {
                                bgcolor: isCovered ? colors.primary : colors.softtext
                              }
                            }}
                          />
                        </Box>
                        
                        <Accordion disabled={!isCovered}>
                          <AccordionSummary expandIcon={isCovered ? <ExpandMoreIcon /> : null}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography fontWeight="medium">Key Milestones</Typography>
                              {!isCovered && (
                                <Typography variant="caption" color="text.secondary">
                                  (Upgrade plan to access)
                                </Typography>
                              )}
                            </Box>
                          </AccordionSummary>
                          <AccordionDetails>
                            <List dense>
                              {guideline.milestones.map((milestone, idx) => {
                                const isCompleted = guideline.completedMilestones?.includes(idx);
                                return (
                                  <ListItem 
                                    key={idx} 
                                    sx={{ 
                                      px: 0, 
                                      py: 0.5,
                                      cursor: isCovered ? 'pointer' : 'default',
                                      '&:hover': isCovered ? { bgcolor: `${colors.primary}05` } : {}
                                    }}
                                    onClick={() => isCovered && !isCompleted && handleCompleteMilestone(guideline.age, idx)}
                                  >
                                    <ListItemIcon sx={{ minWidth: 30 }}>
                                      {isCompleted ? (
                                        <CheckCircleIcon />
                                      ) : (
                                        <Box sx={{ 
                                          width: 20, 
                                          height: 20, 
                                          borderRadius: '50%', 
                                          border: `2px solid ${isCovered ? colors.primary : colors.softtext}`,
                                          opacity: isCovered ? 1 : 0.5
                                        }} />
                                      )}
                                    </ListItemIcon>
                                    <ListItemText 
                                      primary={milestone}
                                      primaryTypographyProps={{
                                        sx: { 
                                          color: isCompleted ? 'success.main' : 'text.primary',
                                          textDecoration: isCompleted ? 'line-through' : 'none',
                                          opacity: isCovered ? 1 : 0.7
                                        }
                                      }}
                                    />
                                  </ListItem>
                                );
                              })}
                            </List>
                          </AccordionDetails>
                        </Accordion>

                        <Accordion disabled={!isCovered}>
                          <AccordionSummary expandIcon={isCovered ? <ExpandMoreIcon /> : null}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography fontWeight="medium">Health Checks</Typography>
                            </Box>
                          </AccordionSummary>
                          <AccordionDetails>
                            <List dense>
                              {guideline.healthChecks.map((check, idx) => (
                                <ListItem key={idx} sx={{ px: 0, py: 0.5 }}>
                                  <ListItemIcon sx={{ minWidth: 30 }}>
                                    <HospitalIcon />
                                  </ListItemIcon>
                                  <ListItemText 
                                    primary={check} 
                                    secondary={guideline.planCoverage[idx]}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </AccordionDetails>
                        </Accordion>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <AssessmentIcon sx={{ fontSize: 64, color: colors.softtext, mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Development Guidelines Locked
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
              Subscribe to a Baby Care plan to access personalized development guidelines, 
              milestone tracking, and expert recommendations for your baby's growth.
            </Typography>
            <Button
              variant="contained"
              onClick={() => setActiveTab(0)}
              sx={{ bgcolor: colors.primary }}
              size="large"
            >
              View Subscription Plans
            </Button>
          </Box>
        )}
      </Box>
    );
  };

  // Calculate baby's age
  const calculateBabyAge = (dateOfBirth) => {
    if (!dateOfBirth) return 'Not specified';
    
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`;
    } else {
      return `${months} month${months > 1 ? 's' : ''}`;
    }
  };

  // Render step content
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ mb: 3, color: colors.primary }}>
              Choose Your Baby Care Plan
            </Typography>
            <Grid container spacing={3}>
              {subscriptionPlans.map((plan) => (
                <Grid item xs={12} md={4} key={plan.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      border: selectedPlan?.id === plan.id ? `2px solid ${plan.color}` : '1px solid #e0e0e0',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: `${plan.color}20`, color: plan.color, mr: 2, width: 50, height: 50 }}>
                          {plan.icon}
                        </Avatar>
                        <Typography variant="h5" component="div" sx={{ color: plan.color, fontWeight: 'bold' }}>
                          {plan.name}
                        </Typography>
                      </Box>
                      <Typography variant="h4" sx={{ color: plan.color, fontWeight: 'bold', mb: 1 }}>
                        ₹{plan.price.toLocaleString()}
                        <Typography variant="body2" component="span" sx={{ color: 'text.secondary', ml: 1 }}>
                          /{plan.duration}
                        </Typography>
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {plan.description}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <List dense>
                        {plan.features.map((feature, index) => (
                          <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 36, color: plan.color }}>
                              {feature.icon}
                            </ListItemIcon>
                            <ListItemText 
                              primary={feature.text} 
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                    <CardActions>
                      <Button
                        fullWidth
                        variant={selectedPlan?.id === plan.id ? "contained" : "outlined"}
                        sx={{
                          bgcolor: selectedPlan?.id === plan.id ? plan.color : 'transparent',
                          color: selectedPlan?.id === plan.id ? 'white' : plan.color,
                          borderColor: plan.color,
                          '&:hover': {
                            bgcolor: plan.color,
                            color: 'white'
                          }
                        }}
                        onClick={() => handlePlanSelect(plan)}
                      >
                        {selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan'}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ mb: 3, color: colors.primary }}>
              Baby Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Baby's Name"
                  name="name"
                  value={babyDetails.name}
                  onChange={handleBabyDetailsChange}
                  InputProps={{
                    startAdornment: <span style={{ marginRight: 8 }}>👶</span>
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={babyDetails.dateOfBirth}
                  onChange={handleBabyDetailsChange}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <span style={{ marginRight: 8 }}>📅</span>
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={babyDetails.gender}
                    onChange={handleBabyDetailsChange}
                    startAdornment={<span style={{ marginRight: 8 }}>👦</span>}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Blood Group</InputLabel>
                  <Select
                    name="bloodGroup"
                    value={babyDetails.bloodGroup}
                    onChange={handleBabyDetailsChange}
                    startAdornment={<span style={{ marginRight: 8 }}>🩸</span>}
                  >
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                    <MenuItem value="AB+">AB+</MenuItem>
                    <MenuItem value="AB-">AB-</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Weight (kg)"
                  name="weight"
                  value={babyDetails.weight}
                  onChange={handleBabyDetailsChange}
                  type="number"
                  InputProps={{
                    startAdornment: <span style={{ marginRight: 8 }}>⚖️</span>
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Height (cm)"
                  name="height"
                  value={babyDetails.height}
                  onChange={handleBabyDetailsChange}
                  type="number"
                  InputProps={{
                    startAdornment: <span style={{ marginRight: 8 }}>📏</span>
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Allergies (if any)"
                  name="allergies"
                  value={babyDetails.allergies}
                  onChange={handleBabyDetailsChange}
                  placeholder="List any known allergies..."
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Special Needs/Requirements"
                  name="specialNeeds"
                  value={babyDetails.specialNeeds}
                  onChange={handleBabyDetailsChange}
                  placeholder="Any special care requirements..."
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ mb: 3, color: colors.primary }}>
              Parent Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Father's Name"
                  name="fatherName"
                  value={parentDetails.fatherName}
                  onChange={handleParentDetailsChange}
                  InputProps={{
                    startAdornment: <span style={{ marginRight: 8 }}>👨</span>
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Mother's Name"
                  name="motherName"
                  value={parentDetails.motherName}
                  onChange={handleParentDetailsChange}
                  InputProps={{
                    startAdornment: <span style={{ marginRight: 8 }}>👩</span>
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={parentDetails.email}
                  onChange={handleParentDetailsChange}
                  InputProps={{
                    startAdornment: <span style={{ marginRight: 8 }}>📧</span>
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={parentDetails.phone}
                  onChange={handleParentDetailsChange}
                  InputProps={{
                    startAdornment: <span style={{ marginRight: 8 }}>📱</span>
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Address"
                  name="address"
                  value={parentDetails.address}
                  onChange={handleParentDetailsChange}
                  placeholder="Full address for caregiver visits"
                  InputProps={{
                    startAdornment: <span style={{ marginRight: 8 }}>🏠</span>
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Emergency Contact"
                  name="emergencyContact"
                  value={parentDetails.emergencyContact}
                  onChange={handleParentDetailsChange}
                  helperText="Contact number in case of emergencies"
                  InputProps={{
                    startAdornment: <span style={{ marginRight: 8 }}>🚨</span>
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ mb: 3, color: colors.primary }}>
              Caregiver Preferences
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Preferred Care Hours</InputLabel>
                  <Select
                    name="preferredHours"
                    value={caregiverPreferences.preferredHours}
                    onChange={handleCaregiverPreferencesChange}
                  >
                    <MenuItem value="4">4 hours/day</MenuItem>
                    <MenuItem value="8">8 hours/day</MenuItem>
                    <MenuItem value="12">12 hours/day</MenuItem>
                    <MenuItem value="24">24 hours/day</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Shift Preference</InputLabel>
                  <Select
                    name="shiftPreference"
                    value={caregiverPreferences.shiftPreference}
                    onChange={handleCaregiverPreferencesChange}
                  >
                    <MenuItem value="day">Day Shift (8 AM - 8 PM)</MenuItem>
                    <MenuItem value="night">Night Shift (8 PM - 8 AM)</MenuItem>
                    <MenuItem value="flexible">Flexible</MenuItem>
                    <MenuItem value="24x7">24x7 Coverage</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Special Requirements for Caregiver"
                  name="specialRequirements"
                  value={caregiverPreferences.specialRequirements}
                  onChange={handleCaregiverPreferencesChange}
                  placeholder="e.g., Experience with twins, Knowledge of sign language, CPR certified, etc."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="includeWeekends"
                      checked={caregiverPreferences.includeWeekends}
                      onChange={handleCaregiverPreferencesChange}
                    />
                  }
                  label="Include Weekend Care"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="includeHolidays"
                      checked={caregiverPreferences.includeHolidays}
                      onChange={handleCaregiverPreferencesChange}
                    />
                  }
                  label="Include Holiday Care"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Subscription Duration (months)"
                  type="number"
                  value={subscriptionDuration}
                  onChange={(e) => setSubscriptionDuration(e.target.value)}
                  InputProps={{
                    startAdornment: <span style={{ marginRight: 8 }}>📅</span>
                  }}
                  inputProps={{ min: 1, max: 12 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Preferred Start Date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <span style={{ marginRight: 8 }}>🎯</span>
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 4:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ mb: 3, color: colors.primary }}>
              Payment Summary
            </Typography>
            {selectedPlan && (
              <Paper sx={{ p: 3, mb: 3, bgcolor: `${selectedPlan.color}10`, borderLeft: `4px solid ${selectedPlan.color}` }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                      Order Summary
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="text.secondary">Plan:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right" fontWeight="bold" sx={{ color: selectedPlan.color }}>
                      {selectedPlan.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="text.secondary">Duration:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      {subscriptionDuration} month(s)
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="text.secondary">Monthly Price:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      ₹{selectedPlan.price.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="text.secondary">Total Amount:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right" variant="h6" sx={{ color: selectedPlan.color, fontWeight: 'bold' }}>
                      ₹{(selectedPlan.price * parseInt(subscriptionDuration)).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2" color="text.secondary">
                      You will be redirected to Razorpay's secure payment gateway to complete your purchase.
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  // Render Baby Profile Tab
  const renderBabyProfile = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ color: colors.primary, fontWeight: 'bold' }}>
          👶 Baby Profile: {babyDetails.name || 'Not Set'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => setActiveTab(0)}
            sx={{ color: colors.primary }}
          >
            Back to Plans
          </Button>
          {babyDetails.name && (
            <Button
              variant="contained"
              onClick={() => setActiveTab(3)}
              sx={{ bgcolor: colors.primary }}
            >
              View Development Guidelines
            </Button>
          )}
        </Box>
      </Box>

      {babyDetails.name ? (
        <Grid container spacing={3}>
          {/* Baby Information Card */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: colors.primary }}>
                  Baby Information
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Name" 
                      secondary={babyDetails.name}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Date of Birth" 
                      secondary={babyDetails.dateOfBirth}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Age" 
                      secondary={calculateBabyAge(babyDetails.dateOfBirth)}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Gender" 
                      secondary={babyDetails.gender}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Blood Group" 
                      secondary={babyDetails.bloodGroup || 'Not specified'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Weight & Height" 
                      secondary={`${babyDetails.weight || '--'} kg / ${babyDetails.height || '--'} cm`}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Health Stats Card */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: colors.primary }}>
                  Health Statistics
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" gutterBottom>
                    Vaccination Progress
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={60} 
                    sx={{ height: 10, borderRadius: 5, mb: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    6 of 10 vaccinations completed
                  </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" gutterBottom>
                    Development Progress
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={40} 
                    sx={{ height: 10, borderRadius: 5, mb: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    8 of 20 milestones achieved
                  </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" gutterBottom>
                    Growth Percentile
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={75} 
                    sx={{ height: 10, borderRadius: 5, mb: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    75th percentile for age
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Next Checkup
                  </Typography>
                  <Chip 
                    icon={<CalendarIcon />}
                    label="2024-03-15"
                    color="warning"
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Development Progress Card */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 'bold' }}>
                    📈 Development Progress
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => setActiveTab(3)}
                    sx={{ color: colors.primary }}
                  >
                    View All
                  </Button>
                </Box>
                
                {developmentGuidelines.slice(0, 3).map((guideline, index) => {
                  const completionPercentage = guideline.completionPercentage || 0;
                  const isCovered = checkPlanCoverage(guideline.planCoverage);
                  
                  return (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" fontWeight="medium">
                          {guideline.age}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {completionPercentage}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={completionPercentage} 
                        sx={{ 
                          height: 6, 
                          borderRadius: 3,
                          bgcolor: colors.softbg,
                          '& .MuiLinearProgress-bar': {
                            bgcolor: isCovered ? colors.primary : colors.softtext
                          }
                        }}
                      />
                    </Box>
                  );
                })}
                
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => setActiveTab(3)}
                  sx={{ mt: 2, color: colors.primary, borderColor: colors.primary }}
                >
                  Track All Milestones
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Subscription Info Card */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: colors.primary }}>
                  Subscription Information
                </Typography>
                {selectedPlan ? (
                  <List>
                    <ListItem>
                      <ListItemText 
                        primary="Current Plan" 
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ bgcolor: `${selectedPlan.color}20`, color: selectedPlan.color, width: 24, height: 24 }}>
                              {selectedPlan.icon}
                            </Avatar>
                            <Typography variant="body2" fontWeight="medium">
                              {selectedPlan.name}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Status" 
                        secondary={
                          <Chip 
                            label="Active" 
                            size="small" 
                            color="success"
                          />
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Duration" 
                        secondary={`${subscriptionDuration} month(s)`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Features Included" 
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            {selectedPlan.features.slice(0, 3).map((feature, idx) => (
                              <Typography key={idx} variant="caption" display="block" sx={{ mb: 0.5 }}>
                                • {feature.text}
                              </Typography>
                            ))}
                            <Typography variant="caption" color="primary">
                              +{selectedPlan.features.length - 3} more features
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  </List>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      No active subscription
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => setActiveTab(0)}
                      sx={{ bgcolor: colors.primary, mt: 2 }}
                    >
                      Subscribe Now
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Vaccination Schedule */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 'bold' }}>
                    💉 Vaccination Schedule
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddVaccination}
                    size="small"
                  >
                    Add Vaccine
                  </Button>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Vaccine</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Dose</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {vaccinationSchedule.map((vaccine) => (
                        <TableRow key={vaccine.id}>
                          <TableCell>{vaccine.name}</TableCell>
                          <TableCell>{vaccine.age}</TableCell>
                          <TableCell>{vaccine.dose}</TableCell>
                          <TableCell>
                            <Chip 
                              label={vaccine.status}
                              size="small"
                              color={
                                vaccine.status === 'completed' ? 'success' :
                                vaccine.status === 'upcoming' ? 'warning' : 'default'
                              }
                            />
                          </TableCell>
                          <TableCell>{vaccine.date}</TableCell>
                          <TableCell>
                            <Tooltip title="Mark as completed">
                              <IconButton 
                                size="small"
                                onClick={() => handleMarkVaccination(vaccine.id, 'completed')}
                                disabled={vaccine.status === 'completed'}
                              >
                                <CheckCircleIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Set as upcoming">
                              <IconButton 
                                size="small"
                                onClick={() => handleMarkVaccination(vaccine.id, 'upcoming')}
                              >
                                <NotificationsIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Baby Reports */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 'bold' }}>
                    📋 Baby Reports & Documents
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddReport}
                    sx={{ bgcolor: colors.primary }}
                  >
                    Add Report
                  </Button>
                </Box>
                
                <Grid container spacing={2}>
                  {babyReports.map((report) => (
                    <Grid item xs={12} md={6} key={report.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                            <Box>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {report.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {report.date} • {report.doctor}
                              </Typography>
                            </Box>
                            <Chip 
                              label={report.type}
                              size="small"
                              color={report.type === 'vaccination' ? 'primary' : 'secondary'}
                            />
                          </Box>
                          <Typography variant="body2" paragraph>
                            {report.description}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                              size="small"
                              startIcon={<DownloadIcon />}
                              onClick={() => handleDownloadReport(report)}
                            >
                              Download
                            </Button>
                            <Button
                              size="small"
                              startIcon={<VisibilityIcon />}
                              onClick={() => {/* View report details */}}
                            >
                              View
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Growth Milestones */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: colors.primary, fontWeight: 'bold' }}>
                  📊 Growth Milestones
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Age</TableCell>
                        <TableCell>Milestone</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Achieved Date</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {growthMilestones.map((milestone) => (
                        <TableRow key={milestone.id}>
                          <TableCell>{milestone.age}</TableCell>
                          <TableCell>{milestone.milestone}</TableCell>
                          <TableCell>
                            <Chip 
                              label={milestone.status}
                              size="small"
                              color={
                                milestone.status === 'achieved' ? 'success' :
                                milestone.status === 'in-progress' ? 'warning' : 'default'
                              }
                            />
                          </TableCell>
                          <TableCell>{milestone.date}</TableCell>
                          <TableCell>
                            <IconButton 
                              size="small"
                              onClick={() => handleUpdateMilestone(milestone.id, 'achieved')}
                              disabled={milestone.status === 'achieved'}
                            >
                              <CheckCircleIcon />
                            </IconButton>
                            <IconButton 
                              size="small"
                              onClick={() => handleUpdateMilestone(milestone.id, 'in-progress')}
                            >
                              <TimelineIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <ChildCareIcon sx={{ fontSize: 64, color: colors.softtext, mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No baby profile created yet
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Complete the subscription process to create a baby profile and access all features
          </Typography>
          <Button
            variant="contained"
            onClick={() => setActiveTab(0)}
            sx={{ bgcolor: colors.primary }}
          >
            Subscribe Now
          </Button>
        </Box>
      )}
    </Box>
  );

  // Add Report Dialog
  const ReportDialog = () => (
    <Dialog 
      open={openReportDialog} 
      onClose={() => setOpenReportDialog(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Add Baby Report</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Report Type</InputLabel>
              <Select
                value={newReport.type}
                onChange={(e) => setNewReport({...newReport, type: e.target.value})}
                label="Report Type"
              >
                <MenuItem value="checkup">Regular Checkup</MenuItem>
                <MenuItem value="vaccination">Vaccination</MenuItem>
                <MenuItem value="emergency">Emergency Visit</MenuItem>
                <MenuItem value="development">Development Assessment</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Date"
              value={newReport.date}
              onChange={(e) => setNewReport({...newReport, date: e.target.value})}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Doctor's Name"
              value={newReport.doctorName}
              onChange={(e) => setNewReport({...newReport, doctorName: e.target.value})}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Findings"
              value={newReport.findings}
              onChange={(e) => setNewReport({...newReport, findings: e.target.value})}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Weight (kg)"
              type="number"
              value={newReport.weight}
              onChange={(e) => setNewReport({...newReport, weight: e.target.value})}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Height (cm)"
              type="number"
              value={newReport.height}
              onChange={(e) => setNewReport({...newReport, height: e.target.value})}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Head Circumference (cm)"
              type="number"
              value={newReport.headCircumference}
              onChange={(e) => setNewReport({...newReport, headCircumference: e.target.value})}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Additional Notes"
              value={newReport.notes}
              onChange={(e) => setNewReport({...newReport, notes: e.target.value})}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              component="label"
              fullWidth
            >
              Upload Document
              <input
                type="file"
                hidden
                onChange={(e) => setNewReport({...newReport, file: e.target.files[0]})}
              />
            </Button>
            {newReport.file && (
              <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                Selected: {newReport.file.name}
              </Typography>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenReportDialog(false)}>Cancel</Button>
        <Button onClick={handleSaveReport} variant="contained">
          Save Report
        </Button>
      </DialogActions>
    </Dialog>
  );

  // New Folder Dialog
  const FolderDialog = () => (
    <Dialog 
      open={openFolderDialog} 
      onClose={() => setOpenFolderDialog(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FolderIcon />
          Create New Folder
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Folder Name"
              value={newFolder.name}
              onChange={(e) => setNewFolder({...newFolder, name: e.target.value})}
              placeholder="e.g., Vaccination Records"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={newFolder.description}
              onChange={(e) => setNewFolder({...newFolder, description: e.target.value})}
              placeholder="Brief description of what this folder contains"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenFolderDialog(false)}>Cancel</Button>
        <Button onClick={handleCreateFolder} variant="contained">
          Create Folder
        </Button>
      </DialogActions>
    </Dialog>
  );

  // Upload File Dialog
  const UploadDialog = () => (
    <Dialog 
      open={openUploadDialog} 
      onClose={() => setOpenUploadDialog(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CloudUploadIcon />
          Upload File
          {currentFolder && (
            <Chip 
              label={currentFolder.name}
              size="small"
              sx={{ ml: 2 }}
            />
          )}
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="File Name"
              value={uploadFile.name}
              onChange={(e) => setUploadFile({...uploadFile, name: e.target.value})}
              placeholder="e.g., BCG Certificate"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>File Type</InputLabel>
              <Select
                value={uploadFile.type}
                onChange={(e) => setUploadFile({...uploadFile, type: e.target.value})}
                label="File Type"
              >
                <MenuItem value="document">Document</MenuItem>
                <MenuItem value="pdf">PDF</MenuItem>
                <MenuItem value="image">Image</MenuItem>
                <MenuItem value="video">Video</MenuItem>
                <MenuItem value="excel">Excel</MenuItem>
                <MenuItem value="zip">Zip Archive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Description"
              value={uploadFile.description}
              onChange={(e) => setUploadFile({...uploadFile, description: e.target.value})}
              placeholder="Brief description of this file"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              component="label"
              fullWidth
            >
              Select File
              <input
                type="file"
                hidden
                onChange={(e) => setUploadFile({...uploadFile, file: e.target.files[0]})}
              />
            </Button>
            {uploadFile.file && (
              <Box sx={{ mt: 2, p: 2, bgcolor: colors.softbg, borderRadius: 1 }}>
                <Typography variant="body2" fontWeight="medium">
                  Selected File:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {uploadFile.file.name} ({(uploadFile.file.size / (1024 * 1024)).toFixed(2)} MB)
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenUploadDialog(false)}>Cancel</Button>
        <Button 
          onClick={handleFileUpload} 
          variant="contained"
          disabled={!uploadFile.file}
        >
          Upload File
        </Button>
      </DialogActions>
    </Dialog>
  );

  // View File Dialog
  const ViewFileDialog = () => {
    if (!selectedFile) return null;

    return (
      <Dialog 
        open={viewFileDialog} 
        onClose={() => setViewFileDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {selectedFile.icon}
            <Box>
              <Typography variant="h6">{selectedFile.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                Added on {selectedFile.date} • {selectedFile.size}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedFile.description && (
            <Box sx={{ mb: 3, p: 2, bgcolor: colors.softbg, borderRadius: 1 }}>
              <Typography variant="body2">
                {selectedFile.description}
              </Typography>
            </Box>
          )}
          
          <Box sx={{ textAlign: 'center', py: 4 }}>
            {selectedFile.type === 'image' ? (
              <img 
                src={selectedFile.url} 
                alt={selectedFile.name}
                style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px' }}
              />
            ) : selectedFile.type === 'pdf' ? (
              <Box sx={{ p: 4, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                <PdfIcon sx={{ fontSize: 64, color: '#f44336', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  PDF Document
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click download to view this PDF file
                </Typography>
              </Box>
            ) : (
              <Box sx={{ p: 4, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                <FileIcon sx={{ fontSize: 64, color: colors.primary, mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  {selectedFile.type.toUpperCase()} File
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click download to save this file
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewFileDialog(false)}>Close</Button>
          <Button 
            onClick={() => {
              handleFileDownload(selectedFile);
              setViewFileDialog(false);
            }}
            variant="contained"
            startIcon={<DownloadIcon />}
          >
            Download File
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  // Phone Confirmation Modal
  const PhoneConfirmationModal = () => {
    if (!showPhoneConfirm) return null;

    const handlePhoneConfirmClick = () => {
      const validationError = validatePhoneNumber(tempPhone);
      
      if (validationError) {
        setPhoneError(validationError);
        return;
      }
      
      // Update parent details with confirmed phone
      setParentDetails(prev => ({ ...prev, phone: tempPhone }));
      
      // Proceed with payment
      initiatePayment();
    };

    return (
      <Dialog 
        open={showPhoneConfirm} 
        onClose={() => setShowPhoneConfirm(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ color: colors.primary, fontWeight: 'bold' }}>
          Confirm Contact Details
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Enter your mobile number to proceed with payment
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              border: `1px solid ${phoneError ? '#f44336' : tempPhone.length === 10 && !phoneError ? '#4CAF50' : '#ddd'}`,
              borderRadius: '8px',
              padding: '12px 15px',
              backgroundColor: '#f9f9f9'
            }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mr: 2,
                pr: 2,
                borderRight: '1px solid #ddd'
              }}>
                <Typography sx={{ mr: 1, color: colors.darktext }}>+91</Typography>
                <span style={{ color: colors.softtext }}>▼</span>
              </Box>
              <input
                type="tel"
                value={tempPhone}
                onChange={(e) => handlePhoneInput(e.target.value)}
                placeholder="6300604470"
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  fontSize: '16px',
                  color: colors.darktext,
                  minWidth: '0'
                }}
                maxLength={10}
                autoFocus
              />
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mt: 1 
            }}>
              <Typography variant="caption" color={phoneError ? 'error' : colors.softtext}>
                {phoneError || `${tempPhone.length}/10 digits`}
              </Typography>
              {tempPhone.length === 10 && !phoneError && (
                <Typography variant="caption" color="success.main" fontWeight="bold">
                  ✓ Valid number
                </Typography>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setShowPhoneConfirm(false)}
            sx={{ color: colors.softtext }}
          >
            Cancel
          </Button>
          <Button
            onClick={handlePhoneConfirmClick}
            disabled={tempPhone.length !== 10 || !!phoneError}
            variant="contained"
            sx={{ 
              bgcolor: colors.primary,
              '&:hover': { bgcolor: colors.darktext }
            }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  // Render baby care operations
  const renderOperations = () => (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 4, color: colors.primary, fontWeight: 'bold' }}>
        Complete Baby Care Operations
      </Typography>
      <Grid container spacing={3}>
        {babyCareOperations.map((category, categoryIndex) => (
          <Grid item xs={12} md={6} key={categoryIndex}>
            <Card sx={{ 
              height: '100%', 
              borderTop: `4px solid ${category.color}`,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4
              }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: `${category.color}20`, 
                    color: category.color, 
                    mr: 2,
                    width: 40,
                    height: 40
                  }}>
                    {category.icon}
                  </Avatar>
                  <Typography variant="h6" sx={{ color: category.color, fontWeight: 'bold' }}>
                    {category.category}
                  </Typography>
                </Box>
                <List>
                  {category.operations.map((operation, opIndex) => (
                    <ListItem key={opIndex} sx={{ px: 0, py: 1 }}>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: `${category.color}20`, color: category.color, width: 36, height: 36 }}>
                          {operation.icon}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body1" fontWeight="medium">
                            {operation.name}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            {operation.description}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  // Main render
  return (
    <Box>
      {/* Header with Back Button, Title, and Book Appointments Button */}
      <Box sx={{ 
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: 'white',
        py: 2,
        mb: 4,
        borderBottom: '1px solid #e0e0e0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <Container maxWidth="lg">
          <Grid container alignItems="center" justifyContent="space-between">
            {/* Left: Back to Dashboard Button */}
            <Grid item>
              <Button
                variant="outlined"
                sx={{ 
                  borderColor: colors.primary, 
                  color: colors.primary,
                  '&:hover': {
                    borderColor: colors.darktext,
                    color: colors.darktext
                  }
                }}
                onClick={() => setActiveView('dashboard')}
                startIcon={<ArrowBackIcon />}
              >
                Back to Dashboard
              </Button>
            </Grid>

            {/* Center: Title */}
            <Grid item>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: colors.primary, 
                  fontWeight: 'bold',
                }}
              >
                👶 Baby Care
              </Typography>
            </Grid>

            {/* Right: Book Appointments Button */}
            <Grid item>
              <Button
                variant="contained"
                sx={{ 
                  bgcolor: colors.primary,
                  '&:hover': {
                    bgcolor: colors.darktext
                  }
                }}
                onClick={handleBookAppointments}
                startIcon={<AppointmentIcon />}
              >
                Book Appointments
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Subtitle */}
        <Typography variant="h6" color="text.secondary" paragraph align="center" sx={{ mb: 4 }}>
          Complete baby care solutions with health tracking, vaccination management, and developmental guidance
        </Typography>

        {/* Tabs Navigation */}
        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            centered
            sx={{
              '& .MuiTab-root': { fontWeight: 'bold' },
              '& .Mui-selected': { color: `${colors.primary} !important` }
            }}
          >
            <Tab label="Subscription Plans" />
            <Tab label="Baby Profile & Reports" />
            <Tab label="Documents & Files" />
            <Tab label="Development Guidelines" />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        {activeTab === 0 && (
          <Box>
            {/* Stepper */}
            <Paper sx={{ p: 3, mb: 4, bgcolor: colors.softbg }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Paper>

            {/* Step Content */}
            <Paper sx={{ p: 4, mb: 4, bgcolor: 'white' }}>
              {renderStepContent(activeStep)}
            </Paper>

            {/* Navigation Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 6 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ color: colors.primary }}
              >
                ← Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={loading || (activeStep === 0 && !selectedPlan)}
                sx={{ 
                  bgcolor: colors.primary,
                  '&:hover': { bgcolor: colors.darktext },
                  '&:disabled': { bgcolor: '#ccc' }
                }}
                startIcon={activeStep === steps.length - 2 ? <span>💳</span> : null}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : activeStep === steps.length - 2 ? (
                  'Proceed to Payment'
                ) : activeStep === steps.length - 1 ? (
                  'Complete'
                ) : (
                  'Next →'
                )}
              </Button>
            </Box>

            {/* Baby Care Operations */}
            {renderOperations()}
          </Box>
        )}

        {activeTab === 1 && renderBabyProfile()}
        
        {activeTab === 2 && renderFolderTab()}
        
        {activeTab === 3 && renderDevelopmentGuidelinesTab()}

        {/* Success Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircleIcon />
              Subscription Activated Successfully!
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
              Your <strong>{selectedPlan?.name}</strong> has been activated for <strong>{babyDetails.name}</strong>.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A confirmation email has been sent to {parentDetails.email}. 
              Our caregiver will contact you within 24 hours to schedule the first visit.
            </Typography>
            <Box sx={{ mt: 3, p: 2, bgcolor: colors.softbg, borderRadius: 1 }}>
              <Typography variant="body2" fontWeight="medium">
                Next Steps:
              </Typography>
              <List dense>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <span>1️⃣</span>
                  </ListItemIcon>
                  <ListItemText primary="Expect a call from our team within 24 hours" />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <span>2️⃣</span>
                  </ListItemIcon>
                  <ListItemText primary="Schedule your first caregiver visit" />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <span>3️⃣</span>
                  </ListItemIcon>
                  <ListItemText primary="Access baby profile and tracking features" />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <span>4️⃣</span>
                  </ListItemIcon>
                  <ListItemText primary="Start tracking development milestones" />
                </ListItem>
              </List>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={handleStartSubscription}
              variant="contained"
              sx={{ 
                bgcolor: colors.primary,
                '&:hover': { bgcolor: colors.darktext }
              }}
            >
              Go to Baby Profile
            </Button>
          </DialogActions>
        </Dialog>

        {/* Report Dialog */}
        <ReportDialog />

        {/* Folder Dialogs */}
        <FolderDialog />
        <UploadDialog />
        <ViewFileDialog />

        {/* Phone Confirmation Modal */}
        <PhoneConfirmationModal />

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        {/* Floating Action Button for Quick Actions */}
        {activeTab === 1 && (
          <Fab
            color="primary"
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              bgcolor: colors.primary
            }}
            onClick={handleAddReport}
          >
            <AddIcon />
          </Fab>
        )}
        
        {activeTab === 2 && (
          <Fab
            color="primary"
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              bgcolor: colors.primary
            }}
            onClick={() => setOpenUploadDialog(true)}
          >
            <CloudUploadIcon />
          </Fab>
        )}
      </Container>
    </Box>
  );
};

export default Babycare;