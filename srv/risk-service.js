const externalService = cds.connect.to("API_BUSINESS_PARTNER");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
module.exports = function RiskService(srv) {
  srv.after("READ", "Risks", (risks) => {
    risks = Array.isArray(risks) ? risks:[risks];
    risks.forEach(
        risk => (risk.criticality = risk.impact >= 100000 ? 1 : 3)
    );
  });
  srv.on("READ", "BusinessPartners", async (req) => {
        req.query.where("LastName <> '' and FirstName <> ''");
        return (await externalService).transaction().emit({
            query: req.query,
            headers: {
                "APIKey": process.env.apikey,
                "DataServiceVersion": "2.0",
                "Accept": "application/json"
            }
        });
  })
};
