# 🤖 SEO ReportBot - Multi-Agent Development System

## Overview

This directory contains **4 specialized coding agent prompts** designed to work in parallel to complete the SEO ReportBot project and make it production-ready for revenue generation.

Each agent has a specific domain of expertise and clear deliverables. Together, they will take the project from 35% complete to 100% production-ready in approximately **6-8 weeks**.

---

## 📋 Agent Roster

### 🔧 [Agent 1: Backend Services & API Integration](./agent-1-backend-services.md)
**Focus:** Core business logic, Google API integrations, report generation pipeline

**Key Deliverables:**
- Complete Google Search Console, Analytics 4, and PageSpeed API clients
- Build report generation and data aggregation services
- Implement Claude AI integration for insights
- Create background job queue system
- Build all API routes (clients, reports, settings, OAuth)

**Timeline:** 5-7 days  
**Priority:** CRITICAL PATH - Nothing works without this

---

### 🎨 [Agent 2: Frontend Dashboard & UI](./agent-2-frontend-dashboard.md)
**Focus:** User interface, dashboard pages, forms, user experience

**Key Deliverables:**
- Dashboard homepage with stats and quick actions
- Client management pages (list, add, edit, detail)
- Report pages (list, detail, preview, download)
- Settings pages (branding customization)
- Reusable UI components (organisms and molecules)
- Responsive design and accessibility

**Timeline:** 5-7 days  
**Priority:** HIGH - Users need UI to interact with the system

---

### 📄 [Agent 3: PDF Generation & Report Design](./agent-3-pdf-generation.md)
**Focus:** PDF template system, document design, data visualization

**Key Deliverables:**
- Complete PDF generation infrastructure
- Professional PDF components (cover, summary, charts, tables)
- White-label branding application
- Chart rendering for traffic trends
- PDF upload to Vercel Blob storage
- Integration with report generator

**Timeline:** 4-6 days  
**Priority:** CRITICAL - PDFs are the deliverable product

---

### 🧪 [Agent 4: Integration, Testing & Production Readiness](./agent-4-integration-testing.md)
**Focus:** Quality assurance, testing, bug fixing, deployment

**Key Deliverables:**
- End-to-end integration testing
- API route testing and validation
- Error handling implementation
- Performance optimization
- Complete documentation
- Production deployment
- Post-launch verification

**Timeline:** 5-7 days  
**Priority:** CRITICAL - Quality gate before revenue

---

## 🎯 Development Strategy

### Parallel Development Approach

The agents can work simultaneously because their domains have minimal overlap:

```
Week 1-2:
├─ Agent 1: Google API clients + Report generator
├─ Agent 2: Dashboard + Client management
├─ Agent 3: PDF infrastructure + Basic components
└─ Agent 4: Test script preparation

Week 3-4:
├─ Agent 1: AI insights + Background jobs + API routes
├─ Agent 2: Reports pages + Settings pages
├─ Agent 3: Complete PDF components + Charts
└─ Agent 4: Integration testing begins

Week 5-6:
├─ Agent 1: Bug fixes from Agent 4 feedback
├─ Agent 2: Polish UI, error states, loading states
├─ Agent 3: PDF quality refinement
└─ Agent 4: Performance optimization + Documentation

Week 7-8:
├─ All Agents: Final integration fixes
├─ Agent 4: Production deployment
└─ Launch readiness verification
```

### Dependencies Between Agents

**Agent 1 → Agent 3:** Report data structure must be defined before PDF templates  
**Agent 1 → Agent 2:** API routes must exist before frontend can call them  
**Agent 3 → Agent 1:** PDF generator integrated into report generation  
**Agent 4 → All:** Tests and fixes for all components  

---

## 📊 Current Project State

### ✅ What Exists (35% Complete)
- Next.js 14 project scaffolded
- Database schema complete (Prisma)
- Authentication working (NextAuth + Google OAuth)
- Component library (atoms and basic molecules)
- Basic project structure and routing

### 🚧 What's Missing (65% to Build)
- Google API integrations (40% complete, need finishing)
- Report generation pipeline (0% - needs building)
- PDF generation system (0% - needs building)
- Dashboard UI pages (0% - needs building)
- Background job processing (0% - needs building)
- Error handling (minimal)
- Testing (minimal)
- Documentation (minimal)

---

## 🚀 Getting Started

### For Each Agent:

1. **Read your agent file** - Understand your domain and deliverables
2. **Review project context** - Read `CLAUDE.md` and `documentation/` folder
3. **Check current state** - Explore existing code in your domain
4. **Start building** - Follow your agent's implementation guide
5. **Communicate blockers** - Flag any issues or dependencies
6. **Test your work** - Verify functionality before marking complete

### Communication Between Agents:

- **Agent 1 & 3:** Coordinate on report data structure
- **Agent 1 & 2:** Coordinate on API endpoints and response formats
- **Agent 4:** Reviews all code, provides feedback to other agents
- **All:** Use clear commit messages and documentation

---

## 📁 File Organization

```
.claude/
├── README.md (this file)
├── agent-1-backend-services.md
├── agent-2-frontend-dashboard.md
├── agent-3-pdf-generation.md
└── agent-4-integration-testing.md
```

---

## ✅ Definition of Done

### For Each Agent:
- [ ] All deliverables from your agent file completed
- [ ] Code follows project standards (TypeScript strict, proper error handling)
- [ ] Your domain's tests pass
- [ ] Documentation updated for your components
- [ ] Code reviewed by Agent 4

### For the Project:
- [ ] User can sign up and customize branding
- [ ] User can add clients and connect Google APIs
- [ ] User can generate reports in <3 minutes
- [ ] Reports generate with white-label branding
- [ ] PDFs are professional and downloadable
- [ ] All critical bugs fixed
- [ ] Deployed to production
- [ ] Revenue generation possible

---

## 🎓 Best Practices

### Code Quality
- Write TypeScript in strict mode (no `any` types)
- Add JSDoc comments for public functions
- Handle errors with try-catch and proper error types
- Use Zod for input validation
- Follow existing code patterns

### UI/UX
- Every action needs a loading state
- Every error needs a user-friendly message
- Every empty state needs helpful text
- Mobile responsive by default
- Accessible (keyboard navigation, ARIA labels)

### Testing
- Test happy paths and edge cases
- Test with real Google API data when possible
- Verify error handling works
- Check performance with large datasets
- Test on different browsers/devices

### Communication
- Document complex logic
- Leave clear TODO comments if something is incomplete
- Update README when adding new features
- Create issues for bugs found in other agent's code

---

## 🆘 Need Help?

### Resources:
- **Project Context:** `/CLAUDE.md`
- **Technical Specs:** `/documentation/Development Specs`
- **Brand Guidelines:** `/documentation/digital_frog_brand_guide.html`
- **Business Strategy:** `/documentation/Marketing, Sales, Comercial & CEO Overview`

### Common Questions:

**Q: My work depends on another agent's code that isn't done yet**  
A: Create a mock/stub version to unblock yourself, or coordinate timing

**Q: I found a bug in existing code**  
A: Document it, fix it if it's in your domain, or flag for Agent 4

**Q: The requirements in my agent file seem unclear**  
A: Check the documentation folder for more context, or make reasonable assumptions

**Q: I finished early, what should I do?**  
A: Help Agent 4 with testing, polish your UI/code, or improve documentation

---

## 🎯 Success Metrics

### Technical Metrics:
- Report generation success rate: >95%
- Report generation time: <3 minutes
- Page load time: <2 seconds
- Build passes without errors
- Zero critical bugs in production

### Business Metrics:
- Time from signup to first report: <10 minutes
- PDF quality: Professional, ready to send to clients
- White-label branding: Fully customizable
- System can handle: 100+ clients per agency

---

## 🚀 Let's Build This!

**Current Status:** Ready to start development  
**Goal:** Production-ready SaaS in 6-8 weeks  
**Outcome:** Revenue-generating product for digital marketing agencies  

Each agent is critical to success. Work with focus, communicate clearly, and we'll have an amazing product ready to launch!

**Questions?** Check your agent file or the documentation folder.  
**Ready?** Let's code! 💻

---

*Created: 2025-01-06*  
*Project: SEO ReportBot - White-label SaaS*  
*Status: 35% Complete → Target: 100% Production Ready*
