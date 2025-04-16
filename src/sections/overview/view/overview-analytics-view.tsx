import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Api from 'src/helpers/Api';
import { _tasks, _posts, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { subscriptionProps } from 'src/sections/processes/view';

import { AnalyticsNews } from '../analytics-news';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';
// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
	const today = new Date();
	const yyyy = today.getFullYear();
	const mm = String(today.getMonth() + 1).padStart(2, '0');
	const monthCategories = Array.from({ length: parseInt(mm, 10) }, (_, i) =>
		format(new Date(2024, i, 1), 'MMM')
	);
	const [businessCount, setBusinessCount] = useState([]);
	const [userCount, setUserCount] = useState([]);
	const [basicMonthly, setBasicMonthly] = useState([]);
	const [standardMonthly, setStandardMonthly] = useState([]);
	const [premiumMonthly, setPremiumMonthly] = useState([]);

	useEffect(() => {
		Api.getTotalBusinessCount().then((response) => response.json())
			.then((data) => {
				if (data.status === 'success') {
					setBusinessCount(data.monthly);
				}
			})
		Api.getTotalSubscribedUsersCount().then((response) => response.json())
			.then((data) => {
				if (data.status === 'success') {
					setUserCount(data.monthly);
				}
			});
		Api.getAllSubscribedUsers().then((response) => response.json())
			.then((data) => {
				if (data.status === 'success') {
					setBasicMonthly(data.basicMonthly);
					setStandardMonthly(data.standardMonthly);
					setPremiumMonthly(data.premiumMonthly);
				}
			});
	}, []);
	return (
		<DashboardContent maxWidth="xl">
			<Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
				Hi, Welcome back 👋
			</Typography>

			<Grid container spacing={3}>
				<Grid xs={12} sm={6}>
					<AnalyticsWidgetSummary
						title="Total Businesses"
						percent={businessCount.length > 0 ? (businessCount[businessCount.length - 1] - businessCount[0]) / businessCount[0] : 0}
						total={businessCount.reduce((acc, curr) => acc + curr, 0)}
						icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />}
						chart={{
							categories: monthCategories,
							series: businessCount,
						}}
					/>
				</Grid>

				<Grid xs={12} sm={6}>
					<AnalyticsWidgetSummary
						title="Active Users"
						percent={userCount.length > 0 ? (userCount[userCount.length - 1] - userCount[0]) / userCount[0] : 0}
						total={userCount.reduce((acc, curr) => acc + curr, 0)}
						color="secondary"
						icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
						chart={{
							categories: monthCategories,
							series: userCount,
						}}
					/>
				</Grid>

				<Grid xs={12} md={6} lg={4}>
					<AnalyticsCurrentVisits
						title="Business Types"
						chart={{
							series: [
								{ label: 'America', value: 3500 },
								{ label: 'Asia', value: 2500 },
								{ label: 'Europe', value: 1500 },
								{ label: 'Africa', value: 500 },
							],
						}}
					/>
				</Grid>

				<Grid xs={12} md={6} lg={8}>
          <AnalyticsWebsiteVisits
            title="Subscription Statistics"
            chart={{
              categories: monthCategories,
              series: [
                { name: 'Basic', data: basicMonthly },
                { name: 'Standard', data: standardMonthly },
				{ name: 'Premium', data: premiumMonthly },
              ],
            }}
          />
        </Grid>

			</Grid>
		</DashboardContent>
	);
}
