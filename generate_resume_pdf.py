import sys
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

def create_resume(output_filename="Himanshi_Bawne_Resume.pdf"):
    doc = SimpleDocTemplate(
        output_filename,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=32,
        bottomMargin=32
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    teal_dark = colors.HexColor("#0f766e")
    teal_light = colors.HexColor("#14b8a6")
    slate_dark = colors.HexColor("#0f172a")
    slate_gray = colors.HexColor("#334155")
    slate_light = colors.HexColor("#64748b")
    line_gray = colors.HexColor("#cbd5e1")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=teal_dark,
        alignment=1, # Center
        spaceAfter=4
    )

    contact_style = ParagraphStyle(
        'ContactText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=slate_gray,
        alignment=1,
        spaceAfter=8
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=teal_dark,
        spaceBefore=6,
        spaceAfter=3,
        textTransform='uppercase'
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=slate_gray,
        spaceAfter=3
    )

    item_title_style = ParagraphStyle(
        'ItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.8,
        leading=12,
        textColor=slate_dark
    )

    item_sub_style = ParagraphStyle(
        'ItemSub',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=11.5,
        textColor=teal_dark
    )

    item_date_style = ParagraphStyle(
        'ItemDate',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=11.5,
        textColor=slate_light,
        alignment=2 # Right
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.2,
        textColor=slate_gray,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=2
    )

    story = []

    # Header
    story.append(Paragraph("<b>HIMANSHI BAWNE</b>", title_style))
    contact_html = (
        'Email: <b>himanshibawne75@gmail.com</b> | Phone: <b>+91 8010679384</b> | Location: <b>Nagpur, India</b><br/>'
        'LinkedIn:<b>linkedin.com/in/himanshi-bawne-4440332b5</b> | GitHub: <b>github.com/himanshi482</b>'
    )
    story.append(Paragraph(contact_html, contact_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=teal_dark, spaceBefore=0, spaceAfter=5))

    # Profile Summary
    story.append(Paragraph("PROFILE SUMMARY", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=line_gray, spaceBefore=0, spaceAfter=3))
    summary_text = (
        "Motivated B.Tech student with a strong foundation in Python, C, C++, Core Java, SQL, and web technologies (HTML, CSS), "
        "along with data analytics tools including Tableau, Power BI, and Excel. Currently interning as a Cloud and DevOps Engineer "
        "on an AWS Cloud Computing project. Experienced in building data-driven projects including an Electric Vehicle Population Analysis, "
        "a Classic Model Power BI dashboard, and a Personal Finance Tracking System. Comfortable working with structured datasets, identifying "
        "trends, and translating information into clear, user-friendly outputs. Seeking an entry-level opportunity as a Data Analyst or "
        "Software/Web Developer to apply analytical thinking, programming skills, and attention to detail to real-world problems."
    )
    story.append(Paragraph(summary_text, body_style))

    # Professional Skills
    story.append(Paragraph("PROFESSIONAL SKILLS", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=line_gray, spaceBefore=0, spaceAfter=3))
    skills = [
        "<b>Programming & Analysis:</b> Python, C, C++, Core Java, SQL",
        "<b>Data Analytics:</b> Data categorization, trend identification, data visualization, monthly reporting",
        "<b>Data Visualization & BI Tools:</b> Tableau, Power BI, Excel",
        "<b>Web Technologies:</b> HTML, CSS, JavaScript, REST APIs, Node.js basics",
        "<b>Cloud & DevOps:</b> AWS Services, Linux/Ubuntu, Git & GitHub"
    ]
    for sk in skills:
        story.append(Paragraph(f"&bull; {sk}", bullet_style))

    # Experience
    story.append(Paragraph("EXPERIENCE", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=line_gray, spaceBefore=0, spaceAfter=3))
    
    exp_table_data = [
        [
            Paragraph("<b>Cloud and DevOps Engineer — Intern</b>, <font color='#0f766e'>Weltsphere Technologies Pvt Ltd</font>", item_title_style),
            Paragraph("Jun 2026 – Dec 2026", item_date_style)
        ]
    ]
    exp_table = Table(exp_table_data, colWidths=[380, 140])
    exp_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(exp_table)
    story.append(Paragraph("&bull; Working on an AWS Cloud Computing project as part of a Cloud and DevOps internship.", bullet_style))
    story.append(Paragraph("&bull; Gaining hands-on exposure to cloud infrastructure concepts and DevOps practices in a live project environment.", bullet_style))

    # Projects
    story.append(Paragraph("PROJECTS", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=line_gray, spaceBefore=0, spaceAfter=3))

    # Project 1
    story.append(Paragraph("<b>Electric Vehicle Population Analysis (Tableau)</b>", item_title_style))
    story.append(Paragraph("&bull; Analyzed a 10,000+ record electric vehicle registration dataset (make, model, model year, EV type, electric range, location) using Tableau.", bullet_style))
    story.append(Paragraph("&bull; Built an interactive geographic map visualizing vehicle distribution by county, city, and state; created breakdown views by make/model, model year, and vehicle type.", bullet_style))

    # Project 2
    story.append(Paragraph("<b>Classic Model Sales Dashboard (Power BI)</b> — <font color='#0f766e'>github.com/himanshi482/Classic-Model-PowerBI</font>", item_title_style))
    story.append(Paragraph("&bull; Developed an interactive Power BI dashboard on the Classic Models dataset to track sales performance, margins, and key business metrics.", bullet_style))

    # Project 3
    story.append(Paragraph("<b>Personal Finance Tracking System (Pulse Finance Tracker)</b> — <font color='#0f766e'>github.com/himanshi482/Pulse_Finance_Tracker</font>", item_title_style))
    story.append(Paragraph("&bull; Built a full-stack system to manage income, expenses, and savings with categorized tracking, monthly reports, and dynamic financial visualization.", bullet_style))

    # Education
    story.append(Paragraph("EDUCATION", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=line_gray, spaceBefore=0, spaceAfter=3))
    
    edu_data = [
        [
            Paragraph("<b>G H. Raisoni University, Amravati</b> — B.Tech", item_title_style),
            Paragraph("2023 – 2027", item_date_style)
        ],
        [
            Paragraph("<b>Sindhi Hindi Junior College</b> — Higher Secondary Education (12th)", item_title_style),
            Paragraph("2022", item_date_style)
        ],
        [
            Paragraph("<b>KTR School</b> — Secondary Education (10th)", item_title_style),
            Paragraph("2020", item_date_style)
        ]
    ]
    edu_table = Table(edu_data, colWidths=[380, 140])
    edu_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(edu_table)

    # Certifications & Soft Skills
    story.append(Paragraph("CERTIFICATIONS & SOFT SKILLS", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=line_gray, spaceBefore=0, spaceAfter=3))
    story.append(Paragraph("&bull; <b>Data Analysis | SQL, Tableau, Power BI & Excel | Real Projects</b> — Udemy", bullet_style))
    story.append(Paragraph("&bull; <b>Core Java</b> — Internshala", bullet_style))
    story.append(Paragraph("&bull; <b>Cyber Job Simulation</b> — Deloitte", bullet_style))
    story.append(Paragraph("&bull; <b>Soft Skills:</b> Problem Solving, Communication, Teamwork, Analytical Thinking, Adaptability, Time Management", bullet_style))

    doc.build(story)
    print("PDF generated successfully:", output_filename)

if __name__ == "__main__":
    create_resume()
