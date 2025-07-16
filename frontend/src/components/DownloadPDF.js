// DownloadPDF.js
import html2pdf from 'html2pdf.js';

export function generateSalarySlipPDF(slip, index) {
  const {
    employee_name,
    department,
    email,
    phone,
    base_salary,
    hra,
    da,
    bonus,
    gratuity,
    tax,
    provident_fund,
    final_salary,
    created_at
  } = slip;

  const format = val => `₹${Number(val || 0).toFixed(2)}`;

  const content = `
    <div style="font-family: Arial, sans-serif; padding: 30px; max-width: 800px; color: #1a1a1a;">
      <h2 style="text-align: center; margin-bottom: 0; color: #003366;">Company Name Pvt. Ltd.</h2>
      <h4 style="text-align: center; margin-top: 4px; color: #444;">Salary Slip - #${index + 1}</h4>

      <hr style="margin: 20px 0; border: none; border-top: 2px solid #ccc;" />

      <p><strong>Date:</strong> ${new Date(created_at).toLocaleDateString()}</p>
      <p><strong>Employee Name:</strong> ${employee_name || 'N/A'}</p>
      <p><strong>Department:</strong> ${department || 'N/A'}</p>
      <p><strong>Email:</strong> ${email || 'N/A'}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
        <thead style="background-color: #f0f0f0;">
          <tr>
            <th colspan="2" style="padding: 8px; border: 1px solid #999; text-align: left;">Part A: Salary Components</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding: 8px; border: 1px solid #ccc;">Base Salary</td><td style="padding: 8px; border: 1px solid #ccc;">${format(base_salary)}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ccc;">HRA</td><td style="padding: 8px; border: 1px solid #ccc;">${format(hra)}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ccc;">DA</td><td style="padding: 8px; border: 1px solid #ccc;">${format(da)}</td></tr>
        </tbody>

        <thead style="background-color: #f0f0f0;">
          <tr>
            <th colspan="2" style="padding: 8px; border: 1px solid #999; text-align: left;">Part B: Retirals</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding: 8px; border: 1px solid #ccc;">Bonus</td><td style="padding: 8px; border: 1px solid #ccc;">${format(bonus)}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ccc;">Gratuity</td><td style="padding: 8px; border: 1px solid #ccc;">${format(gratuity)}</td></tr>
        </tbody>

        <thead style="background-color: #f0f0f0;">
          <tr>
            <th colspan="2" style="padding: 8px; border: 1px solid #999; text-align: left;">Deductions</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding: 8px; border: 1px solid #ccc;">Tax</td><td style="padding: 8px; border: 1px solid #ccc;">${format(tax)}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ccc;">Provident Fund (PF)</td><td style="padding: 8px; border: 1px solid #ccc;">${format(provident_fund)}</td></tr>
        </tbody>

        <tfoot>
          <tr style="background-color: #e0e7ff;">
            <td style="padding: 10px; font-weight: bold; border: 1px solid #999;">Final Salary</td>
            <td style="padding: 10px; font-weight: bold; border: 1px solid #999;">${format(final_salary)}</td>
          </tr>
        </tfoot>
      </table>

      <p style="margin-top: 40px; text-align: center; font-style: italic; color: #666;">
        This is a computer-generated document and does not require a signature.
      </p>
    </div>
  `;

  const opt = {
    margin: 0.5,
    filename: `salary_slip_${index + 1}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(content).save();
}
