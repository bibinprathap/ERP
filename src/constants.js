   export const  SERVICEURL = 'http://localhost:50670/api'
   export const  REPORTURL = 'http://localhost:50016'
   export const  DSREPORTURL = 'http://localhost:50016';
export const  ERP_CLIENTNAME =  'ALT' 
export const  ERP_BRANCH =  '2' 
export const  ERP_UNIT =  'PCS' 
export const  ERP_TYPE =  'AUTOD' 
export const  ERP_ITEMDISCOUNT =  true; 
export const  ERP_HASDELIVERYORDER = true;

export const  COMPANY =  'SH'
export const  ERP_CURRENCY =  'AED'
export const  ERP_FINANCIALYEARSTART =new Date('01/04/2016');  
export const  ERP_COSTCENTER =  '1'
export const  ERP_COSTCENTERNAME =  'Main CostCenter'
export const  ERP_USERID =  'U02'
export const  TRNTYPE_CASHSALES = 'IN'   // in2
export const  TRN_CASHSALES =  'CS'
export const  TRNID_CASHSALES = 11
export const  SRC_CASHSALES =  'CS'   // cs2

export const  TRNTYPE_CREDITSALES = 'IN'
export const  TRN_CREDITSALES =  'IN'
export const  TRNID_CREDITSALES = 11
export const  SRC_CREDITSALES =  'IN'


export const  TRNTYPE_DELIVERYORDER = 'DO'
export const  TRN_DELIVERYORDER =  'DO'
export const  TRNID_DELIVERYORDER = 11
export const  SRC_DELIVERYORDER =  'DO'


export const  TRNTYPE_EXPORTSALES = 'IN'
export const  TRN_EXPORTSALES =  'EI'
export const  TRNID_EXPORTSALES = 11
export const  SRC_EXPORTSALES =  'EI'

export const  TRNTYPE_CASHRETURNSALES = 'CN'   // in2
export const  TRN_CASHRETURNSALES =  'RTN'
export const  TRNID_CASHRETURNSALES = 12
export const  SRC_CASHRETURNSALES =  'RT'   // cs2

export const  TRNTYPE_CREDITRETURNSALES = 'CN'   // in2
export const  TRN_CREDITRETURNSALES =  'CN'
export const  TRNID_CREDITRETURNSALES = 12
export const  SRC_CREDITRETURNSALES =  'CN'   // cs2

export const  TRNTYPE_RECEIPT = 'RV'
export const  TRN_RECEIPT =  'RV'
export const  TRNID_RECEIPT = 1
export const  SRC_RECEIPT =  'RV'

export const  TRNTYPE_BANKPAYMENT = 'PV'
export const  TRN_BANKPAYMENT =  'PV'
export const  TRNID_BANKPAYMENT = 1
export const  SRC_BANKPAYMENT =  'PV'


export const  TRNTYPE_BANKDEPOSIT = 'DP'
export const  TRN_BANKDEPOSIT =  'DP'
export const  TRNID_BANKDEPOSIT = 1
export const  SRC_BANKDEPOSIT =  'DP'

export const  TRNTYPE_CASHPAYMENT = 'CP'
export const  TRN_CASHPAYMENT =  'CP'
export const  TRNID_CASHPAYMENT = 1
export const  SRC_CASHPAYMENT =  'CP'

export const  TRNTYPE_RECEIPTADVANCE = 'AR'
export const  TRN_RECEIPTADVANCE =  'AR'
export const  TRNID_RECEIPTADVANCE = 1
export const  SRC_RECEIPTADVANCE =  'AR'


export const  TRNTYPE_PURCHASERETURN = 'DN'
export const  TRN_PURCHASERETURN =  'DN'
export const  TRNID_PURCHASERETURN = 14
export const  SRC_PURCHASERETURN =  'DN'


export const  TRNTYPE_JOURNALVOUCHER = 'JV'
export const  TRN_JOURNALVOUCHER  =  'JV'
export const  TRNID_JOURNALVOUCHER  = 3
export const  SRC_JOURNALVOUCHER  =  'JV'



export const  TRNTYPE_Purchase = 'PR'
export const  TRN_Purchase =  'IM'
export const  TRNID_Purchase = 13
export const  SRC_Purchase =  'PR'

export const  TRNTYPE_OPENINGSTOCK = 'OS'
export const  TRN_OPENINGSTOCK =  'OS'
export const  TRNID_OPENINGSTOCK = 10
export const  SRC_OPENINGSTOCK =  'OS'


export const  TRNTYPE_OPENINGBALANCE = 'OB'
export const  TRN_OPENINGBALANCE =  'OB'
export const  TRNID_OPENINGBALANCE = 0
export const  SRC_OPENINGBALANCE =  'OB'

export const  ERP_ROLLPREVILLAGES = [];
export const  salesman = [];
export const  ERP_currencies =[];
export const  ERP_accounts =[];
export const  users =  [];
export const  Invoicetype =  [{value:'CS',label:'Cash Invoice'},{value:'IN',label:'Credit Invoice'}];
export const  Branches =  [{value:'1',label:'SHJ WH'},{value:'2',label:'SHJ BR1'},
{value:'3',label:'SHJ BR2'},{value:'4',label:'SHJ BR3'}];
export const  brands =   [];
export const  yearlist =   [];
export const  origins =   [];
export const  products =   [];

export const USERROLID = "1";
export const IP = '192.162.0.143'
export const ERP_USER = 'Admin'
export const ERP_COMPANY = 'TATA'
export const AP_HOURS = 0
export const AP_MIN = 0
export const CATEGORY = "1"
export const SERVICETYPE = "2"
export const PRODUCTIONTYPE = "3"
export const SUPPORTTYPE = "4"
export const DURATION = "5"
export const BUDGET = "6"
export const MONTH = "7"
export const YEAR = "8"
export const BIYEAR = "9"
export const STAKEHOLDERTYPE = "10"
export const GENDERTYPE = "11"
export const BENEFECIERIESTYPE = "12"
export const SITETYPE = "13"
export const TRANSPORTATIONTYPE = "14"
export const SERVICEORPRODUCT = "15"
export const ADVICEOREXECUTION = "16"
export const EducationLevel="17"
export const MARITALSTATUS = "18"



//Set status Values
export const STATUS_ACTIVE = "9"
// SET ACTIVE Status for Company Stratgy
export const STATUS_ACTIVEFORCOMPANY_STRATEGY = "13"
export const STATUS_EXTEND_STRATEGY = "15"
 

export function getComboObj(obj, valuefield, labelfield) {
    return { value: obj[valuefield], label: obj[labelfield] }
}


export function monthshortname(monthno){
    var month = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    var b = month[monthno - 1];
    return b;
}

 
 export const roles = [{value:'1',label:'Admin Staff'},
       {value:'2',label:'Registrar'}
       ];
 
  export const relationships  = [{value:'Parent',label:'Parent'},
       {value:'Mother',label:'Mother'}
       ];
 
 export function getFieldValue(fieldname) {
    if (!fieldname)
        return "";
        if (fieldname.value) return fieldname.value;
        if (fieldname) return fieldname;
    return "";
}
 
export function getFieldLabel(fieldname) {
    if (!fieldname)
        return null;
    if (fieldname.label)
        return fieldname.label;
    if (fieldname)
        return fieldname;
    return null;
}


export function number_formatgrid (number, decimals, dec_point, thousands_sep) {
    decimals= 2;
var nm1 =(typeof number === 'undefined') ? '' : number;
if ((nm1 ==='') || (nm1 === 0) )
    return ''

var n = number, prec = decimals;

var toFixedFix = function (n,prec) {
    var k = Math.pow(10,prec);
    return (Math.round(n*k)/k).toString();
};

n = !isFinite(+n) ? 0 : +n;
prec = !isFinite(+prec) ? 0 : Math.abs(prec);
var sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
var dec = (typeof dec_point === 'undefined') ? '.' : dec_point;

var s = (prec > 0) ? toFixedFix(n, prec) : toFixedFix(Math.round(n), prec); 
//fix for IE parseFloat(0.55).toFixed(0) = 0;

var abs = toFixedFix(Math.abs(n), prec);
var _, i;

if (abs >= 1000) {
    _ = abs.split(/\D/);
    i = _[0].length % 3 || 3;

    _[0] = s.slice(0,i + (n < 0)) +
           _[0].slice(i).replace(/(\d{3})/g, sep+'$1');
    s = _.join(dec);
} else {
    s = s.replace('.', dec);
}

var decPos = s.indexOf(dec);
if (prec >= 1 && decPos !== -1 && (s.length-decPos-1) < prec) {
    s += new Array(prec-(s.length-decPos-1)).join(0)+'0';
}
else if (prec >= 1 && decPos === -1) {
    s += dec+new Array(prec).join(0)+'0';
}
return s; 
}

export function number_format (number, decimals, dec_point, thousands_sep) {
       // var s=  number;
    var nm1 =(typeof number === 'undefined') ? '' : number;
    if ((nm1 ==='') || (nm1 === 0) )
        return ''

    var n = number, prec = decimals;

    var toFixedFix = function (n,prec) {
        var k = Math.pow(10,prec);
        return (Math.round(n*k)/k).toString();
    };

    n = !isFinite(+n) ? 0 : +n;
    prec = !isFinite(+prec) ? 0 : Math.abs(prec);
    var sep = (typeof thousands_sep === 'undefined') ? '' : thousands_sep;
    var dec = (typeof dec_point === 'undefined') ? '.' : dec_point;

    var s = (prec > 0) ? toFixedFix(n, prec) : toFixedFix(Math.round(n), prec); 
    //fix for IE parseFloat(0.55).toFixed(0) = 0;

    var abs = toFixedFix(Math.abs(n), prec);
    var _, i;

    if (abs >= 1000) {
        _ = abs.split(/\D/);
        i = _[0].length % 3 || 3;

        _[0] = s.slice(0,i + (n < 0)) +
               _[0].slice(i).replace(/(\d{3})/g, sep+'$1');
        s = _.join(dec);
    } else {
        s = s.replace('.', dec);
    }

    var decPos = s.indexOf(dec);
    if (prec >= 1 && decPos !== -1 && (s.length-decPos-1) < prec) {
        s += new Array(prec-(s.length-decPos-1)).join(0)+'0';
    }
    else if (prec >= 1 && decPos === -1) {
        s += dec+new Array(prec).join(0)+'0';
    }
    return s; 
}

export function getprocedurename(procedrename,companycode)
{
    var procedurename = procedrename;
    if (companycode === "AL"){
        procedurename = procedrename + "ALN";
    }
return procedurename;
}
