import {
  Button,
  Input,
  PageHeader,
  Calendar,
  Form,
  FormItem,
  Col,
  TimePicker,
  Radio,
  RadioGroup,
  Select,
  Option,
  DatePicker,
  Popover,
  Dialog,
  Badge,
  Empty,
  MessageBox, Table, Card, TableColumn, Icon, Drawer, Statistic, Upload
} from 'element-ui'

const coms = [
  Button,
  Input,
  PageHeader,
  Calendar,
  Form,
  FormItem,
  Col,
  TimePicker,
  Radio,
  RadioGroup,
  Select,
  Option,
  DatePicker,
  Popover,
  Dialog,
  Badge,
  Empty,
  MessageBox,
  Table,
  Card,
  TableColumn,
  Dialog,
  Icon,
  Drawer,
  Statistic,
  Upload
]

export default {
  install (Vue, options) {
    coms.map(c => {
      return Vue.component(c.name, c)
    })
  }
}
