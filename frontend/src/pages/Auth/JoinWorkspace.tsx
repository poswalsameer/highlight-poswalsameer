import { toast } from '@components/Toaster'
import { Form, Stack, Text } from '@highlight-run/ui/components'
import useLocalStorage from '@rehooks/local-storage'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/Button/Button'
import {
	AppLoadingState,
	useAppLoadingContext,
} from '@/context/AppLoadingContext'
import {
	useGetAdminQuery,
	useGetWorkspacesQuery,
	useJoinWorkspaceMutation,
} from '@/graph/generated/hooks'
import { AuthBody, AuthFooter, AuthHeader } from '@/pages/Auth/Layout'
import { Landing } from '@/pages/Landing/Landing'
import { ABOUT_YOU_ROUTE } from '@/routers/AppRouter/AppRouter'
import { getEmailDomain } from '@/util/email'
import { showSupportMessage } from '@/util/window'

import * as styles from './AdminForm.css'
import * as authRouterStyles from './AuthRouter.css'

export const DISMISS_JOIN_WORKSPACE_LOCAL_STORAGE_KEY =
	'highlightDismissedJoinWorkspace'

export const JoinWorkspace = () => {
	const { data, loading } = useGetWorkspacesQuery({
		onCompleted: (data) => {
			formStore.setValue(
				formStore.names.workspaceId,
				data?.joinable_workspaces?.[0]?.id,
			)
		},
	})
	const { data: adminData } = useGetAdminQuery()
	const navigate = useNavigate()
	const { setLoadingState } = useAppLoadingContext()
	const [joinWorkspace, { loading: joinLoading }] = useJoinWorkspaceMutation()
	const [_, setDismissedJoinWorkspace] = useLocalStorage(
		DISMISS_JOIN_WORKSPACE_LOCAL_STORAGE_KEY,
		false,
	)

	const formStore = Form.useStore({
		defaultValues: {
			workspaceId: '',
		},
	})
	const workspaceId = formStore.useValue('workspaceId')

	formStore.useSubmit(async (formState) => {
		const response = await joinWorkspace({
			variables: {
				workspace_id: formState.values.workspaceId,
			},
		})

		if (!!response.data?.joinWorkspace) {
			setDismissedJoinWorkspace(true)
			toast.success('Successfully joined workspace!', { duration: 1000 })
			navigate(ABOUT_YOU_ROUTE, { replace: true })
		} else if (response.errors?.length) {
			const error = response.errors[0].message
			toast.error(response.errors[0].message, { duration: 1000 })

			showSupportMessage(
				`I can't join a workspace. This is the error I'm getting: "${error}"`,
			)
		}
	})

	useEffect(() => {
		if (!loading) {
			setLoadingState(AppLoadingState.LOADED)
		}
	}, [loading, setLoadingState])

	useEffect(() => {
		if (data && !data?.joinable_workspaces?.length) {
			navigate(ABOUT_YOU_ROUTE, { replace: true })
		}
	}, [data, navigate])

	if (loading) {
		return null
	}

	const emailDomain = getEmailDomain(adminData?.admin?.email)

	return (
		<Landing>
			<Form className={authRouterStyles.container} store={formStore}>
				<AuthHeader>
					<Text color="moderate">Join Workspace</Text>
				</AuthHeader>
				<AuthBody>
					<Stack gap="16" direction="column">
						<Text>
							Based on your <b>@{emailDomain}</b> email address
							you are able to join the following workspaces.
						</Text>

						<select
							className={styles.select}
							onChange={(e) => {
								const selectedWorkspace =
									data?.joinable_workspaces?.find(
										(workspace) =>
											workspace?.id === e.target.value,
									)

								formStore.setValue(
									formStore.names.workspaceId,
									selectedWorkspace?.id,
								)
							}}
						>
							<option value="" disabled>
								Select a workspace
							</option>

							{data?.joinable_workspaces?.map((workspace) => (
								<option
									key={workspace?.id}
									value={workspace?.id}
								>
									{workspace?.name}
								</option>
							))}
						</select>
					</Stack>
				</AuthBody>
				<AuthFooter>
					<Button
						type="submit"
						kind="primary"
						disabled={!workspaceId}
						onClick={() => null}
						trackingId="join-workspace_submit"
						loading={joinLoading}
					>
						Join Workspace
					</Button>
					<Button
						kind="secondary"
						trackingId="join-workspace_skip"
						onClick={() => {
							setDismissedJoinWorkspace(true)
							navigate(ABOUT_YOU_ROUTE, { replace: true })
						}}
					>
						<Text color="moderate">Create My Own Workspace</Text>
					</Button>
				</AuthFooter>
			</Form>
		</Landing>
	)
}
