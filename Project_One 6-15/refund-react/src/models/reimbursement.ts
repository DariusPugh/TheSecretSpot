export class Reimbursement {
    public username: string = ''
    public time_submitted: number = 0;
    public approver: string = '';
    public items = [
      { "amount": 0, "description": "", "title": ""},
    ]
    public status: string = '';
    public receipts = [];
  }